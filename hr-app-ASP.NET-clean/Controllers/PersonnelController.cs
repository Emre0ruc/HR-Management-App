using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace hr_demo_app_ASPNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelController : ControllerBase
    {
        // Class-level list (in-memory storage)
        private static List<Personnel> personnels = new List<Personnel>
        {
            new Personnel { Id = "264", Name = "Emily", Surname = "Carter", Salary = 20000 },
            new Personnel { Id = "265", Name = "James", Surname = "Mitchell", Salary = 15000 },
            new Personnel { Id = "266", Name = "Sophie", Surname = "Bennett", Salary = 120000 },
            new Personnel { Id = "267", Name = "Liam", Surname = "Harper", Salary = 82000 }
        };

        [HttpGet]
        public IActionResult GetPersonnels()
        {
            return Ok(personnels);
        }

        //Add this method to handle DELETE
        [HttpDelete("{id}")]
        public IActionResult DeletePersonnel(string id)
        {
            var personnel = personnels.FirstOrDefault(p => p.Id == id);
            if (personnel == null)
            {
                return NotFound();
            }

            personnels.Remove(personnel);
            return NoContent(); // 204 success, no content
        }

        [HttpPost]
        public IActionResult AddPersonnel([FromBody] Personnel newPersonnel)
        {
            if (newPersonnel == null || string.IsNullOrWhiteSpace(newPersonnel.Id))
            {
                return BadRequest("Invalid personnel data");
            }

            personnels.Add(newPersonnel);
            return CreatedAtAction(nameof(GetPersonnels), new { id = newPersonnel.Id }, newPersonnel);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePersonnel(string id, [FromBody] Personnel updatedPersonnel)
        {
            var existing = personnels.FirstOrDefault(p => p.Id == id);
            if (existing == null)
            {
                return NotFound();
            }

            // If user is trying to change ID, check if the new ID already exists
            if (updatedPersonnel.Id != id && personnels.Any(p => p.Id == updatedPersonnel.Id))
            {
                return Conflict("A personnel with the new ID already exists.");
            }

            // Remove the old record
            personnels.Remove(existing);

            // Create new record with updated values
            var updated = new Personnel
            {
                Id = updatedPersonnel.Id,
                Name = updatedPersonnel.Name,
                Surname = updatedPersonnel.Surname,
                Salary = updatedPersonnel.Salary
            };

            personnels.Add(updated);

            return Ok(updated);
        }


        // Define a simple model
        public class Personnel
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public int Salary { get; set; }
        }
    }
}