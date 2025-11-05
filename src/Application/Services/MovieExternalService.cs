using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using Application.Interfaces;
using Application.Models;
using Microsoft.Extensions.Configuration;

namespace Application.Services
{
    public class MovieExternalService : IMovieExternalService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public MovieExternalService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<MovieExternalDto?> SearchMovieAsync(string title)
        {
            var apiKey = _config["OMDb:ApiKey"];
            var client = _httpClientFactory.CreateClient("OMDb");

            try
            {
                // Ejecuta una peticion GET
                var movieDto = await client.GetFromJsonAsync<MovieExternalDto>(
                    $"?t={title}&apikey={apiKey}"
                );

                // La API de OMDb devuelve Response: "False" si no encuentra nada
                if (movieDto == null || movieDto.Response == "False")
                {
                    return null;
                }

                return movieDto;
            }
            catch (JsonException)
            {
                // Ocurrió un error al deserializar el JSON
                return null;
            }
        }
    }
}
