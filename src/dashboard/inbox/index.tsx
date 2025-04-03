import { useApplicants } from "@/graphql/useApplicants";

export default function Inbox() {
    const { loading, data } = useApplicants({
        page: 1,
        pageSize: 10,
        filter: {
            filterParameters: [{
                name: "fullName",
                operator: "contains",
                filterVariable: "",
                logicalOperator: "AND"
            }],
            query: "",
            isFavoriteApplicant: false,
            jobListingId: null
        },
        sort: {
            createdAt: "desc"
        }
    });
    if (loading) return <div>Loading...</div>;
    return (
        <div>
            {data?.getCompanyApplicantList.applicants.map((applicant) => (
                <div key={applicant.id}>
                    <h2>{applicant.firstName}</h2>
                    <p>{applicant.email}</p>
                    <p>{applicant.phoneNumber}</p>
                </div>
            ))}
            {data?.getCompanyApplicantList.applicants.length === 0 && (
                <div>No applicants found.</div>
            )}
        </div>
    );
}