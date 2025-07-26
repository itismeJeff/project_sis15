using Microsoft.AspNetCore.Mvc;

namespace SistemaClientes.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Calculadora()
        {
            return View();
        }

        public IActionResult Exportar()
        {
            return View();
        }

        public IActionResult LeerArchivos()
        {
            return View();
        }
    }
}
