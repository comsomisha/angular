using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebControlsLib;

public partial class Controls_StudentControl : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    public Student Data
    {
        get
        {
            var dbObject = new Student();
            dbObject.Name = txtName.Text;
            dbObject.Surname = txtSurname.Text;
            dbObject.Group = int.Parse(txtGroup.Text);
            dbObject.Course = int.Parse(txtCourse.Text);
            dbObject.Sex = string.IsNullOrEmpty(rblSex.SelectedValue) ? null :
                (int?)int.Parse(rblSex.SelectedValue);
            return dbObject;
        }
        set
        {
            txtName.Text = value.Name;
            txtSurname.Text = value.Surname;
            txtGroup.Text = value.Group.ToString();
            txtCourse.Text = value.Course.ToString();
            if (value.Sex != null)
                rblSex.SelectedValue = ((int)value.Sex).ToString();
        }
    }
}