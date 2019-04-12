using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DetailsForm : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Back.Click += Back_Click;

    }

    private void Back_Click(object sender, EventArgs e)
    {
        Response.Redirect("MainForm.aspx");
    }
}