using System.ComponentModel.DataAnnotations;

namespace SistemaClientes.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "La cédula es obligatoria")]
        [StringLength(20, ErrorMessage = "La cédula no puede tener más de 20 caracteres")]
        public string Cedula { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres")]
        public string Nombre { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "El primer apellido es obligatorio")]
        [StringLength(100, ErrorMessage = "El primer apellido no puede tener más de 100 caracteres")]
        public string Apellido1 { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "El segundo apellido es obligatorio")]
        [StringLength(100, ErrorMessage = "El segundo apellido no puede tener más de 100 caracteres")]
        public string Apellido2 { get; set; } = string.Empty;
        
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
    }
} 