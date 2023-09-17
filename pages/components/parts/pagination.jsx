import Link from "next/link";
import { Pagination, PaginationItem } from "@mui/material";

export default function BasePagination({ count, slug, groupID }) {
  return (
    <div
      title="pagination"
      className="flex fixed bottom-4 left-4 bg-gradient p-1 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-700"
    >
      <Pagination
        count={Math.floor(count / 100) + 1}
        color="primary"
        boundaryCount={2}
        showFirstButton
        showLastButton
        // variant="outlined"
        // siblingCount={0}
        // size="medium"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            href={
              groupID
                ? `${slug}?page=${item.page}&group=${groupID}`
                : `${slug}?page=${item.page}`
            }
            {...item}
          />
        )}
      />
    </div>
  );
}
