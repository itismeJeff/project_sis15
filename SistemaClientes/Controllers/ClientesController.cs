using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaClientes.Data;
using SistemaClientes.Models;
using System.Text.Json;
using System.Xml.Linq;

namespace SistemaClientes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        // POST: api/Clientes
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verificar si la cédula ya existe
            var clienteExistente = await _context.Clientes.FirstOrDefaultAsync(c => c.Cedula == cliente.Cedula);
            if (clienteExistente != null)
            {
                return BadRequest("Ya existe un cliente con esta cédula");
            }

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientes), new { id = cliente.Id }, cliente);
        }

        // GET: api/Clientes/export/xml
        [HttpGet("export/xml")]
        public async Task<IActionResult> ExportToXml()
        {
            var clientes = await _context.Clientes.ToListAsync();
            
            var xmlDoc = new XDocument(
                new XElement("Clientes",
                    clientes.Select(c => new XElement("Cliente",
                        new XElement("Id", c.Id),
                        new XElement("Cedula", c.Cedula),
                        new XElement("Nombre", c.Nombre),
                        new XElement("Apellido1", c.Apellido1),
                        new XElement("Apellido2", c.Apellido2),
                        new XElement("FechaRegistro", c.FechaRegistro.ToString("yyyy-MM-dd HH:mm:ss"))
                    ))
                )
            );

            return Content(xmlDoc.ToString(), "application/xml");
        }

        // GET: api/Clientes/export/json
        [HttpGet("export/json")]
        public async Task<IActionResult> ExportToJson()
        {
            var clientes = await _context.Clientes.ToListAsync();
            var json = JsonSerializer.Serialize(clientes, new JsonSerializerOptions 
            { 
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            return Content(json, "application/json");
        }
    }
} 