import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GridFilterPanel } from "@mui/x-data-grid";
import { Modal, Box } from "@mui/material";
import Api from "@/pages/services/api";
import React, { useState, useCallback } from "react";
import { successToast, errorToast, warningToast } from "@/pages/services/toast";
import { useRouter } from "next/router";
import GuideModal from "./modal/guidemodal";
import BasePagination from "./pagination";

const guides = [
  ".رنگ سلول های آبی به این معناست که کاربر اجازه مشاهده سلول مورد نظر را دارد",
  "رنگ سلول های سبز به این معناست که کاربر علاوه بر مشاهده سلول توانایی ویرایش سلول را با دوبار کلیک کردن بر روی سلول خواهد داشت",
  "اگر سلول مورد نظر بی رنگ است به این معناست که کاربر اجازه دیدن یا ویرایش سلول را ندارد. (برای کسب دسترسی به ادمین سیستم مراجعه نمایید)",
  ".با کلیک کردن بر روی هر سر ستون میتوانید ترتیب چیده شدن سلول ها را تغییر دهید",
  ".با کلیک منوی کبابی هر سر ستون میتوانید ستون هایی که نیاز ندارید را پنهان نمایید",
  ".در انتهای جدول در هر صفحه میتوانید تعداد رکورد های موجود در جدول را مشاهده کنید و بین صفحات مختلف جا به جا شوید",
  "بعضی سلول های جدول در حالت انتخاب قرار دارند و درصورتی که کاربر دسترسی ویرایش داشته باشد با دوبار کلیک میتواند از بین گزینه های باز شده یک گزینه را انتخاب نماید",
  ".اگر در سلولی بیشتر از 200 کاراکتر موجود باشد میتوانید با کلیک بر روی گزینه بیشتر کل متن را مشاهده نمایید",
  ".میتوانید سلول های دلخواه خود را پنهان نمایید COLUMNS در تب بالای جدول با کلیک بر روی",
  ".میتوانید سلول های دلخواه خود را با فیلتر مورد نظر ببینید FILTERS با کلیک بر روی گزینه",
  ".میتوانید اندازه ارتفاع سلول ها را به نسبت محتوای موجود در آنها در سه اندازه تغییر دهید DENSITY با کلیک بر روی گزینه",
  ".میتوانید اکسل جدول مورد نظر را دانلود نمایید EXPORT با کلیک بر روی گزینه",
];

// const CustomFilterPanel = (props) => {
//   return <GridFilterPanel {...props} />;
// };

export default function Table({
  components,
  hiddencols,
  page,
  columns,
  server,
  slug,
}) {
  const router = useRouter();

  const [snackbar, setSnackbar] = useState(null);
  const [pageNumber, setPageNumber] = useState(page ? page : 1);
  const [guideModal, setGuideModal] = useState(false);

  const querysets = components["querysets"];
  const count = components["count"];
  const rows = querysets;

  const saveOnServer = useCallback(
    async (newRow) => {
      Api.init();
      const response = await Api.patch(server, `${newRow.id}/`, newRow);
      if (response.data.message === "success") {
        successToast("آپدیت شد");
      } else if (response.data.message === "type") {
        errorToast("لطفا عدد وارد نمایید");
      } else if (response.data.message === "permission") {
        warningToast("عدم دسترسی ادیت سلول");
      } else if (response.data.message === "anyAccess") {
        warningToast("شما دسترسی ادیت سلول های این ردیف را ندارید");
        window.location.reload();
      }
      return response.data.data[0];
    },
    [Api]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const columnVisibility = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const payload = {
      hidden_cols: e,
    };
    Api.init();
    const response = await Api.post(`hidden-columns`, payload);
    return response.data;
  };

  return (
    <div style={{ height: "100%", width: "100%", marginTop: "2%" }}>
      <div
        onClick={() => setGuideModal(true)}
        title="راهنما"
        className="fixed z-[1] right-4 top-4 w-10 h-10 hover:w-12 hover:h-12 hover:right-3 hover:top-3 gradient-background cursor-pointer"
      ></div>
      <DataGrid
        getRowHeight={() => "auto"}
        // getEstimatedRowHeight={() => 200}
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        hideFooter={true}
        showCellVerticalBorder
        showColumnVerticalBorder
        autoHeight
        onColumnVisibilityModelChange={columnVisibility}
        initialState={{
          columns: {
            columnVisibilityModel: hiddencols["hidden_cols"],
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f0f0f0",
            fontFamily: "bkoodak",
            fontSize: "16px",
          },
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: "10px",
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "20px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "30px",
          },
        }}
      />
      <GuideModal
        open={guideModal}
        onClose={() => {
          setGuideModal(false);
        }}
        width={1000}
        title="راهنمای استفاده از جداول"
        guides={guides}
      />

      <BasePagination slug={slug} count={count} />
    </div>
  );
}
