import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getWatchList,
  updateView,
  removeFromWatchList,
  addToWatchList,
  getAllMovies
} from './watchListService';

import {
  errorToast,
  successToast,
  warningToast
} from '../notifications/Notifications';

import AddMovieModal from './AddMovieModal';
import EditViewModal from './EditViewModal';
import WatchListItem from './WatchListItem';
import EmptyWatchList from './EmptyWatchList';

export default function WatchList() {
  const navigate = useNavigate();
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [availableMovies, setAvailableMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingView, setEditingView] = useState(null);

  useEffect(() => {
    loadWatchList();
  }, []);

  useEffect(() => {
    if (showAddModal) loadAvailableMovies();
  }, [showAddModal]);

  const loadWatchList = async () => {
    try {
      setLoading(true);
      const movies = await getWatchList();
      setWatchListMovies(movies);
      setError(null);
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableMovies = async () => {
    try {
      setMoviesLoading(true);
      const movies = await getAllMovies();
      const watchListIds = watchListMovies.map(v => v.movieTitle);
      const filtered = movies.filter(movie => !watchListIds.includes(movie.title));
      setAvailableMovies(filtered);
    } catch (err) {
      errorToast('Error al cargar películas disponibles');
    } finally {
      setMoviesLoading(false);
    }
  };

  const handleAddToWatchList = async (movieData) => {
    try {
      await addToWatchList(movieData);
      successToast('Película agregada a tu lista');
      setShowAddModal(false);
      loadWatchList();
    } catch (err) {
      errorToast('Error al agregar película a la lista');
    }
  };

  const handleEditView = (view) => {
    setEditingView(view);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData) => {
    if (!editingView) return;

    try {
      await updateView(editingView.id, updatedData);
      successToast('Vista actualizada correctamente');
      setShowEditModal(false);
      setEditingView(null);
      loadWatchList();
    } catch (err) {
      errorToast('Error al actualizar la vista');
    }
  };

  const handleRatingChange = async (viewId, newRating) => {
    const currentView = watchListMovies.find(v => v.id === viewId);
    if (!currentView) return;

    try {
      await updateView(viewId, { rating: newRating, dateFinish: currentView.dateFinish });

      setWatchListMovies(prev =>
        prev.map(view =>
          view.id === viewId ? { ...view, rating: newRating } : view
        )
      );

      successToast('Puntuación actualizada');
    } catch (err) {
      errorToast('Error al actualizar la puntuación');
    }
  };

  const handleRemoveFromWatchList = async (viewId) => {
    try {
      await removeFromWatchList(viewId);
      setWatchListMovies(prev => prev.filter(view => view.id !== viewId));
      successToast('Película eliminada de tu lista');
    } catch (err) {
      errorToast('Error al eliminar de la lista');
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">

      {error && (
        <div className="bg-red-600 p-4 mb-4 rounded max-w-3xl mx-auto">
          {error}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl">
            Mi Lista de Películas
          </h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="
              bg-red-600 hover:bg-red-700
              px-6 py-3 rounded-lg font-semibold
              shadow-lg hover:shadow-xl
              transition
            "
          >
            + Agregar
          </button>
        </div>

        {/* MODALES */}
        <AddMovieModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddMovie={handleAddToWatchList}
          availableMovies={availableMovies}
          isLoading={moviesLoading}
        />

        <EditViewModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingView(null);
          }}
          view={editingView}
          onSave={handleSaveEdit}
        />

        {/* CONTENIDO */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : watchListMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {watchListMovies.map(view => (
              <WatchListItem
                key={view.id}
                view={view}
                onEdit={() => handleEditView(view)}
                onRemove={() => handleRemoveFromWatchList(view.id)}
                onRatingChange={handleRatingChange}
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        ) : (
          <EmptyWatchList onExploreClick={() => navigate('/movies')} />
        )}

      </div>
    </div>
  );
}