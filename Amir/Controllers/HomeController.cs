using Amir.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Amir.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public JsonResult GetAll()
        {
            List<User> list = new List<User>();
            list.Add(new User()
            {
                Id = 1,
                Name = "Amir"
            });
            list.Add(new User()
            {
                Id = 2,
                Name = "Rohollah"
            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Persist(User user)
        {
            user.Id = user.Id * 10;
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(User user)
        {
            return Json(user, JsonRequestBehavior.AllowGet);
        }
    }
}