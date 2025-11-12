export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatar || 'https://via.placeholder.com/120'}
            alt={`${profile.name} ${profile.lastName}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-red-600"
          />
        </div>

        {/* Información */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {profile.name} {profile.lastName}
            </h2>
            <p className="text-red-500 font-semibold">{profile.role}</p>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-white">{profile.email}</p>
            </div>

            {profile.description && (
              <div>
                <p className="text-slate-400 text-sm">Descripción</p>
                <p className="text-slate-300">{profile.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}