import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TUTION_CENTER_API_ENDPOINT } from "@/utils/data";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { tutionCenters: companies, searchCompanyByText } = useSelector(
    store => store.tutionCenter,
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  // Delete company handler
  const handleDeleteCompany = async companyId => {
    if (
      !window.confirm(
        "Are you sure you want to delete this company? This will also delete all its jobs and applicants.",
      )
    )
      return;
    try {
      const res = await fetch(`${TUTION_CENTER_API_ENDPOINT}/${companyId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setFilterCompany(prev =>
          prev.filter(c => c._id !== companyId && c.id !== companyId),
        );
      } else {
        alert("Failed to delete company.");
      }
    } catch {
      alert("Error deleting company.");
    }
  };

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Your registered tuition centers</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="min-w-[80px] font-semibold text-gray-900">
              🏢 Logo
            </TableHead>
            <TableHead className="min-w-[200px] font-semibold text-gray-900">
              📚 Center Name
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-gray-900">
              📅 Date
            </TableHead>
            <TableHead className="text-right min-w-[100px] font-semibold text-gray-900">
              ⚙️ Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Tuition Centers
                  </h3>
                  <p className="text-gray-600">
                    You haven&apos;t added any tuition centers yet.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map(company => (
              <TableRow
                key={company._id || company.id}
                className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Avatar className="w-full h-full">
                      <AvatarImage
                        src={company.logo || "default-logo-url"}
                        alt={`${company.name} logo`}
                        className="object-cover"
                      />
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-700">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/tution-centers/${company._id}`)
                        }
                        className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">
                          Edit
                        </span>
                      </div>
                      <div
                        onClick={() => handleDeleteCompany(company._id)}
                        className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">
                          Delete
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
