using ApiMapi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    //class FileMissingErrorResponse
    //{
    //    public string CustomProperty { get; set; } = "this is a custom property";
    //}

    [ApiController]
    [Route("human-bases")]
    public class HumanBasesController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        // different classes with coliding names break swagger docs gen
        [ProducesResponseType(typeof(FileMissingErrorResponse), StatusCodes.Status400BadRequest)]
        public IActionResult CreateHumanBase(IFormFile? humanBase)
        {
            if (humanBase == null)
            {
                return BadRequest(new FileMissingErrorResponse());
            }

            return Ok("Human base created successfully");
        }
    }
}
