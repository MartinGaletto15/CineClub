export default function ProfileCard({ profile, stats }) {
  if (!profile) return null;

  const avatarUrl =
    profile.avatar?.trim() ||
    "https://ui-avatars.com/api/?background=ef4444&color=fff&name=" +
      encodeURIComponent(`${profile.name} ${profile.lastName}`);

  return (
    <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-8 shadow-lg hover:border-slate-500 transition">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt={`${profile.name} ${profile.lastName}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-red-600 shadow-md"
          />
        </div>

        {/* Info básica */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {profile.name} {profile.lastName}
            </h2>
            <p className="text-sm text-slate-300">{profile.email}</p>
            {profile.role && (
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-400 border border-red-500/40">
                {profile.role}
              </span>
            )}
          </div>

          {profile.description && (
            <div>
              <p className="text-slate-400 text-sm mb-1">Descripción</p>
              <p className="text-slate-200 text-sm leading-relaxed">
                {profile.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-8 border-t border-slate-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Actividad en CineClub
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-slate-400 text-xs">En mi lista</p>
              <p className="text-xl font-bold text-white">{stats.total ?? 0}</p>
            </div>

            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-slate-400 text-xs">Completadas</p>
              <p className="text-xl font-bold text-white">
                {stats.completed ?? 0}
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-slate-400 text-xs">Promedio rating</p>
              <p className="text-xl font-bold text-white">
                {stats.avgRating ?? "-"}
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-slate-400 text-xs">Género favorito</p>
              <p className="text-sm font-semibold text-white truncate">
                {stats.favoriteGenre ?? "-"}
              </p>
            </div>
          </div>

          {/* Última vista */}
          {stats.lastWatched && (
            <div className="mt-6">
              <p className="text-slate-400 text-xs mb-1">Última película vista</p>
              <div className="flex items-center gap-3 bg-slate-900/60 rounded-lg p-3 border border-slate-700">
                <img
                  src={stats.lastWatched.moviePoster}
                  alt={stats.lastWatched.movieTitle}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {stats.lastWatched.movieTitle}
                  </p>
                  {stats.lastWatched.dateFinish && (
                    <p className="text-xs text-slate-400">
                      Visto el{" "}
                      {new Date(stats.lastWatched.dateFinish).toLocaleDateString(
                        "es-AR"
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

//Ojo: ahora ProfileCard espera profile y stats. En el Profile.jsx que te di ya lo paso así: <ProfileCard profile={profile} stats={stats} />