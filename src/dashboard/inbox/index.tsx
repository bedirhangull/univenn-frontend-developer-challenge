import { useApplicants } from "@/graphql/useApplicants";

export default function Inbox() {
    const { loading, error, data } = useApplicants({
        page: 1,
        pageSize: 10,
        filter: {
            filterParameters: [
                {
                    name: "fullName",
                    operator: "contains",
                    filterVariable: "",
                    logicalOperator: "AND",
                },
            ],
            query: "",
            isFavoriteApplicant: false,
            jobListingId: null,
        },
        sort: {
            createdAt: "desc",
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data?.getCompanyApplicantList.applicants.map((applicant) => (
                <div key={applicant.id}>
                    <h3>{applicant.firstName} {applicant.lastName}</h3>
                </div>
            ))}
        </div>
    );
}