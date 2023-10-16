import { DataGrid } from "@mui/x-data-grid";
import Api from "@/pages/services/api";
import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import verify from "@/public/logos/permission.png";
import { useRouter } from "next/router";
import GuideModal from "./modal/guidemodal";
import BaseModal from "./modal/basemodal";
import BasePagination from "./pagination";
import { TextField, MenuItem, Button } from "@mui/material";

const guides = [
  ".قابل مشاهده و تغییر است ‍‍‍`god` جداول تعیین دسترسی فقط توسط ادمین های گروه",
  "با کلیک بر روی گزینه انتخاب گروه در گوشه پایین و سمت راست صفحه میتوانید با انتخاب گروه کاربری و صفحه مورد نظر نوع دسترسی را برای هر سلول تغییر دهید",
  "اگر رنگ سلولی آبی باشد به این معناست که کاربران آن گروه کاربری تنها مجاز به مشاهده آن سلول هستند و توانایی ویرایش آن را نخواهند داشت",
  ".اگر رنگ سلولی سبز باشد به این معناست که کاربران آن گروه علاوه بر مشاهده آن سلول توانایی ویرایش سلول را نیز خواهند داشت",
  "اگر سلولی بی رنگ باشد به این معناست که کاربر گروه مورد نظر نه تنها توانایی تغییر سلول را ندارد بلکه نمیتواند آن را نیز ویرایش کند",
  "اگر بر روی آیکون حذف بر روی یک سلول کلیک نمایید دسترسی مشاهده و ویرایش سلول برای گروه کاربری مد نظر برداشته خواهد شد",
  "برای تعیین دسترسی هر ستون بصورت کلی میتوانید با کلیک بر روی سرستون مورد نظر نوع دسترسی مورد نظر برای ستون را تعیین کنید",
];

const SelectGroup = ({ group, page, groups }) => {
  const [groupID, setgroupID] = useState(group);
  const [pageNumber, setPageNumber] = useState(page ? page : 1);
  const onSubmit = (e) => {
    e.preventDefault();
    window.history.pushState(null, "", `?page=${pageNumber}&group=${groupID}`);
    window.location.reload();
    // router.push(`${slug}/?page=${page}&group=${groupID}`);
  };
  return (
    <div className="transition-opacity duration-700 flex items-center fixed right-4 bottom-4 bg-gradient rounded-lg p-1 opacity-60 hover:opacity-100">
      <form className="w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex flex-col p-1 space-y-2">
          <TextField
            sx={{ width: 190 }}
            // id="outlined-select-currency"
            select
            label="گروه"
            defaultValue={groupID}
            onChange={useCallback(
              (e) => {
                e.preventDefault();
                setgroupID(e.target.value);
              },
              [groupID]
            )}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ width: 190 }}
            // id="outlined-helperText"
            label="صفحه"
            defaultValue={pageNumber}
            type="number"
            onChange={useCallback(
              (e) => {
                e.preventDefault();
                setPageNumber(e.target.value);
              },
              [pageNumber]
            )}
          />
          <Button variant="outlined" type="submit">
            تایید
          </Button>
        </div>
      </form>
    </div>
  );
};

const TheGuideModal = ({}) => {
  const [guideModal, setGuideModal] = useState(false);
  return (
    <>
      <div
        onClick={useCallback(() => {
          setGuideModal(true);
        }, [guideModal])}
        title="راهنما"
        className="fixed z-[1] right-4 top-4 w-10 h-10 hover:w-12 hover:h-12 hover:right-3 hover:top-3 gradient-background cursor-pointer transition-opacity duration-700 opacity-80 hover:opacity-100"
      ></div>
      <GuideModal
        open={guideModal}
        onClose={useCallback(() => {
          setGuideModal(false);
        }, [guideModal])}
        width={1000}
        title="راهنمای استفاده از جداول دسترسی"
        guides={guides}
      />
    </>
  );
};

const TheMassPermissionModal = ({
  massServer,
  columns,
  column,
  slug,
  page,
  group,
  groups,
}) => {
  const router = useRouter();
  const [editable, setEditable] = useState(false);
  const [groupID, setgroupID] = useState(group);
  const onSubmitMassPermission = async (e) => {
    e.preventDefault();
    const massPayload = {
      field: column,
      group: groupID,
      editable: editable === "حذف" ? null : editable,
    };
    Api.init();
    await Api.post(massServer, massPayload);
    await router.push(`${slug}/?page=${page}&group=${groupID}`);
  };
  return (
    <>
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
    </>
  );
};

export default function PermissionData({
  querysets,
  permissions,
  groups,
  page,
  group,
  columns,
  server,
  massServer,
  slug,
}) {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState(null);
  const [groupID, setgroupID] = useState(group);
  const [massPermission, setMassPermission] = useState(false);
  const [column, setColumn] = useState("");

  const editables = permissions["editables"];
  const count = permissions["count"];

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

  const memoizedFindDifferentKey = useMemo(() => {
    return findDifferentKey;
  }, []);

  const saveOnServer = useCallback(
    async (updatedRow, originalRow) => {
      Api.init();
      const diff_key = memoizedFindDifferentKey(updatedRow, originalRow);
      const payload = {
        group: groupID,
        field: diff_key,
        instance_id: updatedRow.id,
        editable: updatedRow[diff_key] || false,
      };
      const response = await Api.post(server, payload);
      return response.data[0];
    },
    [Api, memoizedFindDifferentKey]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const onColumnHeaderClick = useCallback(async (e) => {
    await router.push(`${slug}/?page=${page}&group=${groupID}`);
    await setMassPermission(true);
    setColumn(e.field);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", marginTop: "2%" }}>
      <TheGuideModal />
      <DataGrid
        rows={editables}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          saveOnServer(updatedRow, originalRow)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        hideFooter={true}
        showCellVerticalBorder
        showColumnVerticalBorder
        autoHeight
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f0f0f0",
            fontFamily: "bkoodak",
            fontSize: "16px",
          },
        }}
        onColumnHeaderClick={(e) => onColumnHeaderClick(e)}
      />
      <BasePagination count={count} slug={slug} groupID={groupID} />
      <SelectGroup page={page} group={group} groups={groups} />

      <BaseModal
        open={massPermission}
        onClose={() => {
          setMassPermission(false);
        }}
        aria-labelledby="permission-modal-title"
        aria-describedby="permission-modal-description"
      >
        <TheMassPermissionModal
          massServer={massServer}
          columns={columns}
          column={column}
          slug={slug}
          page={page}
          group={group}
          groups={groups}
        />
      </BaseModal>
    </div>
  );
}
