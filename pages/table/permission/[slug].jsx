import { useState, useCallback, useEffect } from "react";
import Api from "../../../services/api";
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
  () => import("@/pages/components/parts/permission"),
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
      {/* <MoreLess params={params} field={field} /> */}
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

  const scope = [
    createObject("id", "id", 100, false),
    createObject("original_report_id", "ID", 130, "boolean", true),
    createObject("fig_no", "Fig. No.", 130, "boolean", true),
    createObject("item_no", "Item No.", 130, "boolean", true),
    createObject("module", "Module", 130, "boolean", true),
    createObject(
      "TUGA_subtitute_part_number",
      "TUGA Substitute Part Number",
      260,
      "boolean",
      true
    ),
    createObject(
      "old_system_part_no",
      "Old System Part No.",
      260,
      "boolean",
      true
    ),
    createObject("description", "Description", 130, "boolean", true),
    createObject(
      "unit_per_end_item",
      "Units Per End Item",
      200,
      "boolean",
      true
    ),
    createObject("assembly", "Assembly", 130, "boolean", true),
    createObject("standard_part", "Standard Part", 130, "boolean", true),
    createObject(
      "new_manufacturing_responsible_department",
      "New Manufacturing Responsible Department",
      390,
      "boolean",
      true
    ),
    createObject("level", "Level", 130, "boolean", true),
    createObject("disassembled", "Disassembled", 130, "boolean", true),
    createObject(
      "progress_certificate",
      "شناسنامه پیشرفت",
      260,
      "boolean",
      true
    ),
    createObject(
      "ThreeD_scan_progress",
      "3D Scan پیشرفت",
      260,
      "boolean",
      true
    ),
    createObject(
      "ThreeD_scan_certificate",
      "3D Scan مدرك",
      260,
      "boolean",
      true
    ),
    createObject(
      "Fi_100_percent_l_modelling",
      "Fi100%l Modelling",
      260,
      "boolean",
      true
    ),
    createObject(
      "Fi_100_percent_l_modelling_certificate",
      "Fi100%l Modelling مدرك",
      260,
      "boolean",
      true
    ),
    createObject("level_2_drawing", "Level 2 Drawing", 130, "boolean", true),
    createObject(
      "level_2_drawing_certificate",
      "Level 2 Drawing مدرك",
      260,
      "boolean",
      true
    ),
    createObject("level_3_drawing", "Level 3 Drawing", 130, "boolean", true),
    createObject(
      "level_3_drawing_certificate",
      "Level 3 Drawing مدرك",
      260,
      "boolean",
      true
    ),
    createObject("assembly_drawing", "Assembly Drawing", 260, "boolean", true),
    createObject(
      "construction_plan_with_assembly_view",
      "نقشه ساخت با نگرش مونتاژی",
      260,
      "boolean",
      true
    ),
    createObject("certificate_code", "كد مدرك شناسنامه", 130, "boolean", true),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه)",
      390,
      "boolean",
      true
    ),
    createObject(
      "identification_report_metallurgical_notebook_of_the_piece_certi",
      "گزارش شناسايي (دفترچه متالوژيكي قطعه) مدرك",
      390,
      "boolean",
      true
    ),
    createObject("raw_material_spec", "اسپك ماده خام", 130, "boolean", true),
    createObject(
      "raw_material_spec_certificate",
      "اسپك ماده خام مدرك",
      260,
      "boolean",
      true
    ),
    createObject("part_spec", "اسپک قطعه", 130, "boolean", true),
    createObject(
      "part_spec_certificate",
      "اسپک قطعه مدرك",
      260,
      "boolean",
      true
    ),
    createObject("cover_spec", "اسپك پوشش", 130, "boolean", true),
    createObject(
      "cover_spec_certificate",
      "اسپك پوشش مدرك",
      260,
      "boolean",
      true
    ),
    createObject("connections_spec", "اسپك اتصالات", 130, "boolean", true),
    createObject(
      "connections_spec_certificate",
      "اسپك اتصالات مدرك",
      260,
      "boolean",
      true
    ),
    createObject(
      "other_specs_complementary_operations",
      "ساير اسپك‌ها (عمليات تكميلي)",
      260,
      "boolean",
      true
    ),
    createObject(
      "other_specs_certificate",
      "ساير اسپك‌ها مدرك",
      260,
      "boolean",
      true
    ),
    createObject(
      "interprocess_maps",
      "نقشه هاي ميان فرآيندي",
      260,
      "boolean",
      true
    ),
    createObject(
      "interprocess_maps_certificate",
      "نقشه هاي ميان فرآيندي مدرك",
      260,
      "boolean",
      true
    ),
    createObject(
      "OPC_or_MPP_rating",
      "OPC يا MPP (راتينگ)",
      260,
      "boolean",
      true
    ),
    createObject("rating_certificate", "راتينگ مدرك", 130, "boolean", true),
    createObject("TP", "TP", 130, "boolean", true),
    createObject("TP_certificate", "TP مدرك", 130, "boolean", true),
    createObject("MQCP", "MQCP", 130, "boolean", true),
    createObject("MQCP_certificate", "MQCP مدرك", 130, "boolean", true),
    createObject("ITP", "ITP", 130, "boolean", true),
    createObject("ITP_certificate", "ITP مدرك", 130, "boolean", true),
    createObject("_3885", "3885", 130, "boolean", true),
    createObject("contract", "Contract", 130, "boolean", true),
    createObject("adv_payment", "Adv. Payment", 130, "boolean", true),
    createObject("material_supply", "Material Supply", 130, "boolean", true),
    createObject(
      "mold_or_die_or_fixture",
      "Mold/Die/Fixture",
      260,
      "boolean",
      true
    ),
    createObject("casting", "Casting", 130, "boolean", true),
    createObject("forge", "Forge", 130, "boolean", true),
    createObject("forming", "Forming", 130, "boolean", true),
    createObject("machining", "Machining", 130, "boolean", true),
    createObject("brazing_or_welding", "Brazing/Welding", 130, "boolean", true),
    createObject("coating", "Coating", 130, "boolean", true),
    createObject(
      "_2_manufacturing_total_progress",
      "میزان پیشرفت ساخت دو دستگاه",
      260,
      "boolean",
      true
    ),
    createObject(
      "_28_manufacturing_total_progress",
      "میزان پیشرفت ساخت ۲۸ دستگاه",
      260,
      "boolean",
      true
    ),
    createObject(
      "_2_side_total_progress",
      "میزان پیشرفت جانبی دو دستگاه",
      260,
      "boolean",
      true
    ),
    createObject(
      "_28_side_total_progress",
      "میزان پیشرفت جانبی 28 دستگاه",
      260,
      "boolean",
      true
    ),
    createObject("dummy_sample", "Dummy sample", 130, "boolean", true),
    createObject("first_articles", "First Articles", 130, "boolean", true),
    createObject(
      "first_articles_test",
      "First Articles Test",
      260,
      "boolean",
      true
    ),
    createObject("mass_production", "Mass Production", 130, "boolean", true),
    createObject(
      "review_and_ITP_approval_4_percent",
      "بررسی و تائید ITP (4%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "qualitative_evaluation_the_contractor_2_percent",
      "ارزيابي كيفي پيمانكار (2%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "kick_off_meeting_3_percent",
      "Kick Off Meeting (3%)",
      260,
      "boolean",
      true
    ),
    createObject("CDR_5_percent", "CDR (5%)", 130, "boolean", true),
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_65_percent",
      "بازرسي كيفي مطابق ITP/MQCP (65%)",
      390,
      "boolean",
      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_7_percent",
      "ارائه گزارش بازرسي Accept/NCR (7%)",
      390,
      "boolean",
      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_5_percent",
      "بررسي پاسخ طراحي به NCR (5%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "compilation_and_approval_final_book_5_percent",
      " تدوين و تاييدFinal Book (5%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      450,
      "boolean",
      true
    ),
    createObject(
      "_2_quality_total_progress",
      "میزان پیشرفت کیفیت دو دستگاه",
      260,
      "boolean",
      true
    ),
    createObject(
      "compliant_quality_inspection_ITP_or_MQCP_75_percent",
      " بازرسي كيفي مطابق ITP/MQCP (75%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "submitting_an_inspection_report_accept_or_NCR_12_percent",
      "ارائه گزارش بازرسي Accept/NCR (12%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "check_the_answer_design_to_NCR_3_percent",
      "بررسي پاسخ طراحي به NCR (3%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "issuing_quality_tag_2_percent",
      "صدور تگ كيفي (2%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "compilation_and_approval_final_book_6_percent",
      " تدوين و تاييد Final Book (6%)",
      260,
      "boolean",
      true
    ),
    createObject(
      "issuance_of_test_certificate_or_Form1_or_CoC_2_percent",
      "صدور Test Certificate /Form1/CoC (2%)",
      390,
      "boolean",
      true
    ),
    createObject(
      "_28_quality_total_progress",
      "میزان پیشرفت کیفیت 28 دستگاه",
      260,
      "boolean",
      true
    ),
  ];

  let columns;
  if (slug === "bom") {
    columns = bom;
  } else if (slug === "provide") {
    columns = provide;
  } else if (slug === "scope") {
    columns = scope;
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
