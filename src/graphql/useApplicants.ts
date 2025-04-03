import { useQuery } from "@apollo/client";
import {
  GET_COMPANY_APPLICANT_LIST,
  ApplicantListVariables,
} from "./getCompanyApplicantList";

export const useApplicants = (variables: ApplicantListVariables) => {
  return useQuery(GET_COMPANY_APPLICANT_LIST, {
    variables,
    context: {
      headers: {
        "x-apollo-operation-name": "getCompanyApplicantList",
        "apollo-require-preflight": "true",
        "content-type": "application/json",
      },
    },
  });
};
