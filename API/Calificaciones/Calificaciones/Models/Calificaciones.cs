using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Calificaciones.Models
{
    [Table("TablaCalificaciones")]
    public class Calificacion
    {
        [Key]
        public int id { get; set; }

        [MaxLength(50)]
        [Required]
        public string nombre { get; set; }

        [MaxLength(50)]
        [Required]
        public string materia { get; set; }

        public double calificacion { get; set; }

    }
}
