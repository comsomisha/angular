using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MainForm : System.Web.UI.Page
{
    string[] _colors = {"red", "green", "blue", "magenta", "yellow"};
    public class ColorWrapper
    {
        public string Name { get; set; }
    }

    const string keyColor = "Color";
    
        private int Color
        {
            get
            {
                return Session[keyColor] == null ? -1 : (int)Session[keyColor];
            }
            set
            {
                Session[keyColor] = value;
            }
        }
        
    /*
    private int Color
    {
        get
        {
            return string.IsNullOrEmpty(hdnColor.Value) ? -1 : int.Parse(hdnColor.Value);
        }
        set
        {
            hdnColor.Value = value.ToString();
        }
    }
    */


    protected void Page_Load(object sender, EventArgs e)
    {         
        dgStudents.SortCommand += DgStudents_SortCommand;
        dgStudents.EditCommand += DgStudents_EditCommand;
        dgStudents.ItemDataBound += DgStudents_ItemDataBound;

        btnAdd.Click += BtnAdd_Click;
        displayColor();
    }

    private void BtnAdd_Click(object sender, EventArgs e)
    {
        Response.Redirect("AddStudent.aspx");
    }

    private void DgStudents_ItemDataBound(object sender, DataGridItemEventArgs e)
    {
        var ctrls = e.Item.Controls;
        if (ctrls[6].Controls.Count > 0)
        {
            var btn = ctrls[6].Controls[0] as Button;
            btn.CommandArgument = (e.Item.DataItem as DataRowView).Row["ID"].ToString();
        }
    }

    private void DgStudents_EditCommand(object source, DataGridCommandEventArgs e)
    {
        long result = 0;
        if (long.TryParse(e.CommandArgument.ToString(), out result))
        {
            Response.Redirect(string.Format("EditStudent.aspx?id={0}", result));
        };        
    }

    string SortCol
    {
        get
        {
            return ViewState["SortCol"] as string;
        }
        set
        {
            ViewState["SortCol"] = value;
        }
    }

    enum SortDest { None, ASC, DESC }
    SortDest SortDestination
    {
        get
        {
            return ViewState["SortDest"] == null ? SortDest.None 
                : (SortDest) ViewState["SortDest"];
        }
        set
        {
            ViewState["SortDest"] = value;
        }
    }
    private void DgStudents_SortCommand(object source, DataGridSortCommandEventArgs e)
    {
        var dest = SortDestination;
        var sortCol = SortCol;
        if (e.SortExpression.Equals(sortCol))
        {
            if (dest == SortDest.ASC)
                SortDestination = SortDest.DESC;
            else
                SortDestination = SortDest.ASC;
            SortCol = e.SortExpression;
        }
        else
        {
            SortDestination = SortDest.ASC;
            SortCol = e.SortExpression;
        }
        dsStudents.SelectCommand = string.Format("select * from Students order by {0} {1}", SortCol, SortDestination);
    }

    private void displayColor()
    {
        if (Color >= 0)
        {
            lblHello.Style["color"] = _colors[Color];
        }
    }

    private void BtnViewDetails_Click(object sender, EventArgs e)
    {
        Response.Redirect("DetailsForm.aspx");
    }

    private void BtnChangeColor_Click(object sender, EventArgs e)
    {
        ++Color;
        displayColor();
        if (Color >= _colors.Length - 1)
            Color = -1;
    }
}