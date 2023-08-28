import { DataGrid } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Modal, Box } from "@mui/material";
import verify from "@/public/logos/permission.png";
import Link from "next/link";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Permission({
  permissions,
  groups,
  page,
  group,
  rows,
  columns,
  server,
  massServer,
  slug,
}) {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState(null);
  const [pageNumber, setPageNumber] = useState(page ? page : 1);
  const [groupID, setgroupID] = useState(group);
  const [massPermission, setMassPermission] = useState(false);
  const [column, setColumn] = useState("");
  const [editable, setEditable] = useState(false);

  const editables = permissions["editables"];
  const count = permissions["count"];

  const merged = rows.map((o1) => {
    const o2 = editables.find((o2) => o2.id === o1.id);
    return o2 ? { ...o1, ...o2 } : o1;
  });

  function findDifferentKey(obj1, obj2) {
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          return key;
        }
      } else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        return key;
      }
    }
    return null;
  }

  const saveOnServer = useCallback(
    async (updatedRow, originalRow) => {
      Api.init();
      const diff_key = findDifferentKey(updatedRow, originalRow);
      const payload = {
        group: groupID,
        field: diff_key,
        instance_id: updatedRow.id,
        editable: updatedRow[diff_key] || false,
      };
      const response = await Api.post(server, payload);
      return response.data[0];
    },
    [Api]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    window.history.pushState(null, "", `?page=${pageNumber}&group=${groupID}`);
    window.location.reload();
  };

  const onColumnHeaderClick = (e) => {
    setMassPermission(true);
    setColumn(e.field);
  };

  const onSubmitMassPermission = async (e) => {
    e.preventDefault();
    const massPayload = {
      field: column,
      group: groupID,
      editable: editable === "حذف" ? null : editable,
    };
    Api.init();
    await Api.post(massServer, massPayload);
    await setMassPermission(false);
    await router.push(`${slug}/?page=${page}&group=${groupID}`);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={merged}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        hideFooter={true}
        showCellVerticalBorder
        showColumnVerticalBorder
        autoHeight
        onColumnHeaderClick={(e) => onColumnHeaderClick(e)}
      />
      <br />
      <div className="flex flex-row justify-start justify-around">
        <div className="flex">
          <p className="flex items-center justify-center mr-4 px-3 h-8 text-sm font-medium bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white">
            {pageNumber * 100 - 99}-{pageNumber * 100} of {count}
          </p>
          <Link
            href={`${slug}?page=${
              pageNumber * 1 - 1
            }&group=${groupID}`}
            className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => setPageNumber(pageNumber * 1 - 1)}
          >
            {`<`}
          </Link>
          <Link
            href={`${slug}?page=${
              pageNumber * 1 + 1
            }&group=${groupID}`}
            className="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => setPageNumber(pageNumber * 1 + 1)}
          >
            {`>`}
          </Link>
        </div>

        <div className="flex items-center">
          <form className="w-full max-w-lg" onSubmit={onSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-group"
                >
                  Group
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:bg-white focus:border-gray-500"
                    id="grid-group"
                    onChange={(e) => {
                      setgroupID(e.target.value);
                    }}
                    value={groupID}
                  >
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                </div>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-page"
                >
                  Page
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
                  id="grid-page"
                  type="number"
                  placeholder={pageNumber}
                  value={pageNumber}
                  onChange={(e) => setPageNumber(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <br />
                <button
                  className="appearance-none block w-full bg-gray-400 text-gray-800 border border-gray-400 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        open={massPermission}
        onClose={() => {
          setMassPermission(false);
        }}
        aria-labelledby="permission-modal-title"
        aria-describedby="permission-modal-description"
      >
        <Box sx={style}>
          <Image src={verify} width={32} height={32} />
          <form
            onSubmit={onSubmitMassPermission}
            className="border-0 sm:border-1 p-10 rounded border-gray-400"
          >
            <div className="w-full mt-2">
              <label
                htmlFor="column"
                className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
              >
                ستون
              </label>
              <select
                className="block appearance-none w-full py-2 px-4 pr-8 rounded bg-gray"
                id="column"
                value={column}
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.field}>
                    {column.headerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="group"
                className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
              >
                گروه
              </label>
              <select
                className="block appearance-none w-full py-2 px-4 pr-8 rounded bg-gray"
                id="group"
                onChange={(e) => {
                  setgroupID(e.target.value);
                }}
                value={groupID}
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="editable"
                className="text-sm font-medium leading-6 text-gray-900 float-right digikala"
              >
                نوع دسترسی
              </label>
              <select
                className="block appearance-none w-full py-2 px-4 pr-8 rounded bg-gray digikala"
                id="editable"
                onChange={(e) => {
                  setEditable(e.target.value);
                }}
                value={editable}
              >
                <option value={false} className="digikala">
                  دیدن
                </option>
                <option value={true} className="digikala">
                  دیدن + ادیت
                </option>
                <option value={null} className="digikala">
                  حذف
                </option>
              </select>
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-gray-950 text-white w-100 rounded py-2 digikala"
                type="submit"
              >
                اعمال دسترسی
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
