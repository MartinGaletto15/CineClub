import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// Importamos los servicios (que ya no piden ID)
import { getUserProfile, updateUserProfile, deleteUserAccount } from './profileService'; 
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';
import ConfirmModal from './ConfirmModal';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Todavía lo usamos para saber SI hay un user
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Solo cargamos si 'user' (del context) existe
    if (user) {
      loadProfile();
    }
    // Cambiamos la dependencia de [user?.id] a [user]
    // Esto se ejecutará cuando el usuario inicie sesión
  }, [user]); 

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      // CAMBIO: Ya no pasamos user.id
      const data = await getUserProfile(); 
      setProfile(data);
    } catch (err) {
      setError('Error al cargar el perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      setError(null);
      // CAMBIO: Ya no pasamos user.id
      const updated = await updateUserProfile(formData); 
      setProfile(updated);
      setIsEditing(false);
      setSuccess('Perfil actualizado correctamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Error al actualizar el perfil');
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setError(null);
      // CAMBIO: Ya no pasamos user.id
      await deleteUserAccount(); 
      setSuccess('Cuenta eliminada correctamente');
      setTimeout(() => {
        // Esta lógica de "logout" es correcta
        localStorage.removeItem('token');
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Error al eliminar la cuenta');
      console.error(err);
    }
  };

  // ... (El resto del return es idéntico) ...

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
          <p className="text-slate-400">Administra tu información personal</p>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <ProfileCard profile={profile} />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                >
                  Eliminar Cuenta
                </button>
              </div>
            </>
          ) : (
            <>
              <EditProfileForm
                profile={profile}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <ConfirmModal
          title="Eliminar Cuenta"
          message="¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
          isDangerous={true}
        />
      )}
    </div>
  );
}