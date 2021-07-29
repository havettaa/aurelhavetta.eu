public partial class Index : System.Web.UI.Page
{
    protected new void Page_Load(object sender, System.EventArgs e)
    {
        string file = System.Web.HttpContext.Current.Server.MapPath("./data.json");
        string json = System.IO.File.ReadAllText(file);
        Response.Clear();
        Response.ContentType = "application/json; charset=utf-8";
        Response.Write(json);
        Response.End();
    }
}
