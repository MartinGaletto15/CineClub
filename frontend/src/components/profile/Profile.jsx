import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, deleteUserAccount } from './profileService'; 
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';
import ConfirmModal from './ConfirmModal';

export default function Profile() {
  const navigate = useNavigate();
  const { name, lastName, avatar, email, role, id, handleUserLogout } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null); // ⭐ estadísticas calculadas aquí
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  // 📌 Cargo perfil al montar
  useEffect(() => {
    if (!id) return;
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile(); 
      setProfile(data);

      // ⭐ También calculo estadísticas
      await loadStats();

    } catch (err) {
      setError("No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Calculador de estadísticas reales
  const loadStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/view/User/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const views = await res.json();

      const total = views.length;
      const completed = views.filter(v => v.dateFinish).length;
      const avgRating = views.reduce((acc, v) => acc + (v.rating || 0), 0) / (total || 1);

      const genreCount = {};
      views.forEach(v => {
        v.genres?.forEach(g => {
          genreCount[g] = (genreCount[g] || 0) + 1;
        });
      });
      const favoriteGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

      setStats({
        total,
        completed,
        avgRating: avgRating.toFixed(1),
        favoriteGenre,
        lastWatched: views[0] // Última vista (si existe)
      });

    } catch (err) {
      console.error("Error al cargar estadísticas", err);
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      const updated = await updateUserProfile(formData);
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      setError("Error al actualizar el perfil");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      handleUserLogout();
      navigate("/login");

    } catch (err) {
      setError("Error al eliminar la cuenta");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-28 pb-12 px-4 text-white">
      <div className="max-w-3xl mx-auto">

        {/* ENCABEZADO */}
        <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-gray-400">Administra tu información personal</p>

        {/* TARJETA */}
        {!isEditing ? (
          <>
            <ProfileCard profile={profile} stats={stats} />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                Editar Perfil
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
              >
                Eliminar Cuenta
              </button>
            </div>
          </>
        ) : (
          <EditProfileForm
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        )}

      </div>

      {showDeleteModal && (
        <ConfirmModal
          title="Eliminar Cuenta"
          message="¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible."
          isDangerous={true}
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}