using Microsoft.EntityFrameworkCore;

namespace Calificaciones.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Calificacion> TablaCalificaciones {  get; set; }

        public Contexto() 
        {
           
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source=d:\\Datos\\Escritorio\\PSW-P9\\Server\\TablaCalificaciones.db");
        
    }
}
