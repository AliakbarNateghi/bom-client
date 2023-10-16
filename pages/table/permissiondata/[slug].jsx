import { useState, useCallback, useEffect } from "react";
import Api from "../../services/api";
import Cookies from "universal-cookie";
import Image from "next/image";
import deletelogo from "@/public/logos/delete.png";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularIndeterminate from "@/pages/components/layout/loading";
import MoreLess from "@/pages/filters/moreless";

const Permission = dynamic(
  () => import("@/pages/components/parts/permissiondata"),
  {
    loading: () => <CircularIndeterminate />,
  }
);

export function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  return null;
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const { req } = context;
  const cookies = new Cookies(req.headers.cookie);
  if (!cookies.get("access_token")) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }
  Api.init(cookies);
  const page = context.query.page || context.params?.page;
  const group = context.query.group || context.params?.group;
  const response = await Api.get(
    `field-permission/${slug}/?page=${page}&group=${group}`
  );
  const componentsData = await Api.get(`components/${slug}/?page=${page}`);
  const components = componentsData.data;
  const permissions = response.data;
  const groupsResponse = await Api.get(`groups`);
  const groups = groupsResponse.data;
  return {
    props: {
      permissions,
      components,
      groups,
      page,
      group,
      slug,
    },
  };
}

function ValueComponent({ params, field, slug, page, group }) {
  const router = useRouter();
  const [deletedCell, setDeletedCell] = useState(params.formattedValue);
  const onDeletePermission = async () => {
    setDeletedCell(null);
    try {
      await Api.delete(
        `field-permission/${slug}`,
        `${params.id}/?field=${params.field}&group=${group}`
      );
      // .then(
      //   router.push(`${slug}/?page=${page}&group=${group}`, undefined, {
      //     shallow: true,
      //   })
      // );
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      {deletedCell ? (
        <div className="flex space-x-11 items-center">
          {/* <div style={{ color }}>{params.formattedValue}</div> */}
          <div className="relative left-12 bottom-2 cursor-pointer opacity-90 hover:opacity-100">
            {/* <MoreLess params={params} field={field} /> */}
            {/* test */}
            <IconButton
              title="حذف تمام دسترسی های سلول"
              aria-label="delete"
              color=""
              onClick={onDeletePermission}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="bg-white h-full w-96 -ml-8 -mr-5"></div>
      )}
    </>
  );
}

function GetValue({ params, field, slug, page, group }) {
  if (params.row[`${field}`] === true) {
    return (
      <ValueComponent
        params={params}
        field={field}
        slug={slug}
        page={page}
        group={group}
      />
    );
  } else if (params.row[`${field}`] === false) {
    return (
      <ValueComponent
        params={params}
        field={field}
        slug={slug}
        page={page}
        group={group}
      />
    );
  } else {
    return null;
  }
}

export default function PermissionRoot({
  permissions,
  components,
  groups,
  page,
  group,
  slug,
}) {
  const querysets = components["querysets"];

  function getValue(params, field) {
    if (params.row[`${field}`] === true) {
      return (
        <ValueComponent
          params={params}
          field={field}
          slug={slug}
          page={page}
          group={group}
        />
      );
    } else if (params.row[`${field}`] === false) {
      return (
        <ValueComponent
          params={params}
          field={field}
          slug={slug}
          page={page}
          group={group}
        />
      );
    } else {
      return null;
    }
  }

  const getClassName = (params, field) => {
    if (params.row[`${field}`] === true) {
      return "bg-green-400 hover:bg-green-600 cursor-pointer";
    } else if (params.row[`${field}`] === false) {
      return "bg-sky-400 hover:bg-sky-600 cursor-pointer";
    } else {
      return "hover:bg-gray-300 cursor-pointer";
    }
  };

  function createObject(field, headerName, width, type, editable) {
    return {
      field: field,
      headerName: headerName,
      width: width,
      type: type,
      editable: editable,
      sortable: false,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) => {
        return field !== "id"
          ? getClassName(params, field)
          : "bg-f0f0f0 font-bold";
      },
      ...(field !== "id" && {
        renderCell: (params) => {
          return getValue(params, field);
          // {
          //   return (
          //     <GetValue
          //       params={params}
          //       field={field}
          //       slug={slug}
          //       page={page}
          //       group={group}
          //     />
          //   );
          // },
        },
      }),
    };
  }

  const bom = [
    createObject("id", "id", 100, undefined, false),
    createObject("revision", "REVISION", 130, "boolean", true),
    createObject("ID", "ID", 130, "boolean", true),
    createObject("P_on_N_status_code", "P/N Status Code", 130, "boolean", true),
    createObject("fig_no", "Fig. No.", 130, "boolean", true),
    createObject("item_no", "Item No.", 130, "boolean", true),
    createObject("module", "Module", 130, "boolean", true),
    createObject("level", "Level", 130, "boolean", true),
    createObject("code", "Code", 130, "boolean", true),
    createObject("parent_code", "Parent Code", 130, "boolean", true),
    createObject("part_number", "Part Number", 130, "boolean", true),
    createObject("description", "Description", 130, "boolean", true),
    createObject("comment", "Comment", 130, "boolean", true),
    createObject("sap_name", "SAP NAME", 130, "boolean", true),
    createObject("unit_per_assy", "Units Per Assy", 130, "boolean", true),
    createObject(
      "unit_per_end_item",
      "Units Per End Item",
      130,
      "boolean",
      true
    ),
    createObject(
      "corrected_units_per_end_item",
      "Corrected Units Per End Item",
      220,
      "boolean",
      true
    ),
    createObject("gg_qty", "GG QTY", 130, "boolean", true),
    createObject("srp", "SRP", 130, "boolean", true),
    createObject("store_comment", "Store Comment", 130, "boolean", true),
    createObject("assembly", "Assembly", 130, "boolean", true),
    createObject("standard_part", "Standard Part", 130, "boolean", true),
    createObject("material", "Material", 130, "boolean", true),
    createObject(
      "mfg_complexity_level",
      "Mfg. Complexity Level",
      220,
      "boolean",
      true
    ),
    createObject("disassembled", "Disassembled", 130, "boolean", true),
    createObject(
      "supplying_or_manufacturing",
      "Supplying / Manufacturing ",
      220,
      "boolean",
      true
    ),
    createObject(
      "internal_or_external_outsourcing",
      "Internal / External outsourcing",
      220,
      "boolean",
      true
    ),
    createObject("vendor", "Vendor", 130, "boolean", true),
    createObject("joining", "Joining", 130, "boolean", true),
    createObject(
      "manufacturing_process",
      "Manufacturing Process",
      220,
      "boolean",
      true
    ),
    createObject(
      "raw_material_form",
      "Raw Material Form",
      150,
      "boolean",
      true
    ),
    createObject("function", "Function", 130, "boolean", true),
    createObject("qc_criteria", "QC Criteria", 130, "boolean", true),
    createObject(
      "manufacturing_priority",
      "Manufacturing Priority ",
      180,
      "boolean",
      true
    ),
    createObject(
      "manufacturing_responsible_department",
      "Manufacturing Responsible Department",
      300,
      "boolean",
      true
    ),
    createObject(
      "designing_responsible_department",
      "Designing Responsible Department",
      300,
      "boolean",
      true
    ),
    createObject(
      "usage_on_other_engines",
      "USAGE ON OTHER ENGINES",
      220,
      "boolean",
      true
    ),
    createObject(
      "manufacturing_parts_category",
      "MANUFACTURING PARTS Category",
      280,
      "boolean",
      true
    ),
    createObject(
      "scope_matrix_category",
      "Scope Matrix Category",
      220,
      "boolean",
      true
    ),
    createObject(
      "requires_manufacturing_or_supplying_for_reassembly",
      "Requires Manufacturing/Supplying For Re-Assembly",
      360,
      "boolean",
      true
    ),
    createObject(
      "system_D_requirements",
      "System D. Requirement",
      200,
      "boolean",
      true
    ),
    createObject("percurment_state", "PERCURMENT STATE", 150, "boolean", true),
    createObject("details", "DETAILS", 130, "boolean", true),
    createObject("joint_type", "Joint Type", 130, "boolean", true),
    createObject(
      "discarded_during_disassembly",
      "DISCARDED DURING DISSASSEMBLY",
      300,
      "boolean",
      true
    ),
    createObject("expendables", "Expendables", 130, "boolean", true),
    createObject(
      "discarded_or_unusable_according_to_docs",
      "Discarded/Unusable According To Docs",
      300,
      "boolean",
      true
    ),
    createObject(
      "destroyed_for_analysis",
      "Destroyed For Analysis",
      220,
      "boolean",
      true
    ),
    createObject(
      "rejected_by_qc_or_inspection",
      "Rejected by QC/Inspection",
      220,
      "boolean",
      true
    ),
    createObject(
      "class_size_or_weight_as_required",
      "Class Size/Weight As Required",
      220,
      "boolean",
      true
    ),
    createObject("EBOM", "EBOM", 130, "boolean", true),
  ];

  const provide = [
    createObject("id", "id", 100, undefined, false),
    createObject(
      "application_type",
      "نوع درخواست (گزارش خريد/قرارداد)",
      260,
      "boolean",
      true
    ),
    createObject("supply_stage", "مرحله تامين", 130, "boolean", true),
    createObject(
      "material_supplier",
      "تامين كننده متريال",
      150,
      "boolean",
      true
    ),
    createObject("pr", " PR شماره", 130, "boolean", true),
    createObject("po", "PO شماره", 130, "boolean", true),
    createObject("subject", "موضوع", 130, "boolean", true),
    createObject("request_type", "جنس درخواست", 130, "boolean", true),
    createObject(
      "customer_management",
      "مديريت سفارش دهنده",
      180,
      "boolean",
      true
    ),
    createObject("contract_number", "شماره قرارداد", 130, "boolean", true),
    createObject("supplier", "تامين كننده", 130, "boolean", true),
    createObject("amount", "مبلغ", 130, "boolean", true),
    createObject("adjustment_amount", "مبلغ تعديل", 130, "boolean", true),
    createObject("currency", "نوع ارز", 130, "boolean", true),
    createObject("expert", "كارشناس مسئول", 130, "boolean", true),
    createObject(
      "prepayment_percentage",
      "درصد پيش‌پرداخت",
      150,
      "boolean",
      true
    ),
    createObject(
      "prepayment_according_to_contract",
      "مبلغ پيش‌پرداخت طبق قرارداد",
      200,
      "boolean",
      true
    ),
    createObject(
      "prepaid_by_toga",
      "پيش پرداخت توسط توگا",
      200,
      "boolean",
      true
    ),
    createObject(
      "prepaid_by_air_engine",
      "پيش پرداخت توسط موتور هوايي",
      200,
      "boolean",
      true
    ),
    createObject(
      "prepayment_guarantee_check",
      "چك تضمين پيش پرداخت",
      200,
      "boolean",
      true
    ),
    createObject(
      "prepayment_guarantee",
      "ضمانتنامه پيش پرداخت",
      200,
      "boolean",
      true
    ),
    createObject(
      "mortgage_document_guarantee",
      "ضمانت نامه سند رهني",
      200,
      "boolean",
      true
    ),
    createObject(
      "financial_situation",
      "وضعيت در معاونت مالي",
      200,
      "boolean",
      true
    ),
    createObject(
      "prepayment_request_date",
      "تاريخ درخواست پيش پرداخت",
      200,
      "boolean",
      true
    ),
    createObject("prepayment_amount", "مبلغ پيش پرداخت", 130, "boolean", true),
    createObject("currency_type", "نوع ارز", 130, "boolean", true),
    createObject(
      "prepayment_date",
      "تاريخ پرداخت پيش پرداخت",
      200,
      "boolean",
      true
    ),
  ];

  let columns;
  if (slug === "bom") {
    columns = bom;
  } else if (slug === "provide") {
    columns = provide;
  }

  return (
    <Permission
      querysets={querysets}
      permissions={permissions}
      groups={groups}
      page={page}
      group={group}
      columns={columns}
      server={`field-permission/${slug}`}
      massServer={`mass-permission/${slug}`}
      slug={slug}
    />
  );
}
