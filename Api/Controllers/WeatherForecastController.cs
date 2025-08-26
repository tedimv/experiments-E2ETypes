using Api;
using Microsoft.AspNetCore.Mvc;

namespace ApiMapi.Controllers
{
    // If multiple request payloads result in the same error class make it more general as multiple ProducesResponseType returning
    // the same status code overwrite each other in swagger
    public class MarsTemperatureErrorResponse
    {
        public string Error { get; set; } = "Temperature data unavailable for Mars";
        public string Code { get; set; } = "MARS_TEMPERATURE_ERROR";
        public string Details { get; set; } = "Mars temperature readings are currently offline";
    }

    public class NoReadingsErrorResponse
    {
        public string Error { get; set; } = "No readings are available at the moment";
        public string Code { get; set; } = "NO_READINGS_ERROR";
    }

    public class FileMissingErrorResponse
    {
        public string Error { get; set; } = "No file attached";
        public string Code { get; set; } = "NO_FILE_ATTACHED";
    }

    [ApiController]
    [Route("weather-forecast")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };


        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(WeatherForecast), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(NoReadingsErrorResponse), StatusCodes.Status400BadRequest)]
        public ActionResult<WeatherForecast> CreateWeatherEntry([FromBody] WeatherForecast weatherForecast)
        {
            var num = Random.Shared.Next(0, 100);
            if (num < 50)
            {
                return BadRequest(new NoReadingsErrorResponse());
            }

            return Ok(new WeatherForecast()
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                Summary = "",
                TemperatureC = 20
            });
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WeatherForecast>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(MarsTemperatureErrorResponse), StatusCodes.Status400BadRequest)]
        public IActionResult GetAllForecasts([FromHeader] string? planet)
        {
            if (planet == "mars")
            {
                return BadRequest(new MarsTemperatureErrorResponse());
            }

            return Ok(Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }).ToArray());
        }

        [HttpPost("upload-planet-weather-map")]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(FileMissingErrorResponse), StatusCodes.Status400BadRequest)]
        public IActionResult UploadMap(IFormFile? planetWeatherMap)
        {
            if (planetWeatherMap == null)
            {
                return BadRequest(new FileMissingErrorResponse());
            }

            return Ok("Planet weather map uploaded successfully");
        }
    }
}
