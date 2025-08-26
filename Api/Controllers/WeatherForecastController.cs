using Api;
using Microsoft.AspNetCore.Mvc;

namespace ApiMapi.Controllers
{

    public class MarsTemperatureErrorResponse
    {
        public string Error { get; set; } = "Temperature data unavailable for Mars";
        public string Code { get; set; } = "MARS_TEMPERATURE_ERROR";
        public string Details { get; set; } = "Mars temperature readings are currently offline";
    }

    // For other error types you might have
    public class NoReadingsErrorResponse
    {
        public string Error { get; set; } = "No readings are available at the moment";
        public string Code { get; set; } = "NO_READINGS_ERROR";
    }

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }


        /// <summary>
        /// Create a weatherforecast entry
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NoReadingsErrorResponse">can throw an exception of kurami</exception>
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


        /// <summary>
        /// My get endpoint
        /// </summary>
        /// <param name="tenant"></param>
        /// <returns></returns>
        /// <exception cref="MarsTemperatureErrorResponse">can throw an exception for temps on mars</exception>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WeatherForecast>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(MarsTemperatureErrorResponse), StatusCodes.Status400BadRequest)]
        public IActionResult Get([FromHeader] string? planet)
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
    }
}
