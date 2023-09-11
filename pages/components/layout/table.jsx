import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, Box } from "@mui/material";
import Api from "@/pages/services/api";
import React, { useState, useCallback } from "react";
import { successToast, errorToast, warningToast } from "@/pages/services/toast";
import Link from "next/link";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const guides = [
  ".رنگ سلول های آبی به این معناست که کاربر اجازه مشاهده سلول مورد نظر را دارد",
  ".رنگ سلول های سبز به این معناست که کاربر علاوه بر مشاهده سلول توانایی ویرایش سلول را با دوبار کلیک کردن بر روی سلول خواهد داشت",
  "اگر سلول مورد نظر بی رنگ است به این معناست که کاربر اجازه دیدن یا ویرایش سلول را ندارد. (برای کسب دسترسی به ادمین سیستم مراجعه نمایید)",
  ".با کلیک کردن بر روی هر سر ستون میتوانید ترتیب چیده شدن سلول ها را تغییر دهید",
  ".با کلیک منوی کبابی هر سر ستون میتوانید ستون هایی که نیاز ندارید را پنهان نمایید",
  ".در انتهای جدول در هر صفحه میتوانید تعداد رکورد های موجود در جدول را مشاهده کنید و بین صفحات مختلف جا به جا شوید",
];

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
    <div style={{ height: "100%", width: "100%" }}>
      <div
        onClick={() => setGuideModal(true)}
        title="راهنما"
        className="absolute right-4 top-4 w-10 h-10 hover:w-12 hover:h-12 hover:right-3 hover:top-3 gradient-background cursor-pointer"
      ></div>
      <DataGrid
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
            // fontWeight: "bolder",
            fontSize: "16px",
          },
        }}
      />
      <Modal
        open={guideModal}
        onClose={() => {
          setGuideModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full list relative">
            <h2 className="bkoodak text-4xl text-center mb-5">
              راهنمای استفاده از جدول اسکوپ ماتریکس
            </h2>
            <ul className="relative ">
              {guides.map((text) => (
                <li className="relative m-5 right-0 text-center bkoodak text-xl">{text}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
      <br />
      <div className="flex flex-row fixed bottom-4 left-4">
        <p className="flex items-center justify-center mr-4 px-3 h-8 text-sm font-medium bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white">
          {pageNumber * 100 - 99}-{pageNumber * 100} of {count}
        </p>
        <Link
          href={`${slug}?page=${pageNumber * 1 - 1}`}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          onClick={() => setPageNumber(pageNumber * 1 - 1)}
        >
          {`<`}
        </Link>

        <Link
          href={`${slug}?page=${pageNumber * 1 + 1}`}
          className="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => setPageNumber(pageNumber * 1 + 1)}
        >
          {`>`}
        </Link>
      </div>
    </div>
  );
}
