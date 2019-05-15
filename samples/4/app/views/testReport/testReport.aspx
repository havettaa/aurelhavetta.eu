<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testReport.aspx.cs" Inherits="Generics.Client.app.views.Report" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<section class="breadcrumb-present">
    <form id="form1" runat="server">

        <h2>Test Report</h2
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" Height="742px" InteractiveDeviceInfos="(Collection)" 
            ProcessingMode="Remote" WaitMessageFont-Names="Verdana" 
            WaitMessageFont-Size="14pt" Width="907px">
            <ServerReport ReportPath="/GenericsSSRS/ReportGRPAgencyAudience" 
                ReportServerUrl="http://localhost/ReportServer" />
        </rsweb:ReportViewer>

        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

    </form>
</section>