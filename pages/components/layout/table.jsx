import { DataGrid } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useCallback } from "react";
import { successToast, errorToast, warningToast } from "@/pages/services/toast";
import Link from "next/link";
import { useRouter } from "next/router";

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
      />
      <br />
      <div className="flex flex-row ">
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
