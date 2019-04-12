using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

/// <summary>
/// Summary description for SexRadioList
/// </summary>
public class SexRadioList : RadioButtonList
{
    public SexRadioList()
    {

    }
    protected override void OnLoad(EventArgs e)
    {
        DataTextField = "Item2";
        DataValueField = "Item1";

        List<Tuple<int, string>> items = new List<Tuple<int, string>>();
        for (int i = 0; i < (int)Sex.Last; i++)
        {
            items.Add(new Tuple<int, string>(i + 1, ((Sex)(i + 1)).ToString()));
        }

        this.DataSource = items;
        this.DataBind();

        base.OnLoad(e);
    }
}
