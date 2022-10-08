import UserManagementTable from "components/UserManagementTable/UserManagementTable";
import { useSelector } from "react-redux";
import * as instructorSelector from "redux/features/instructor/instructorSelector";
import styled from "styled-components";

const InstructorManagementWrapper = styled.div`
  &&& {
    padding: 30px;
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;

function InstructorManagement(props) {
  const instructorData = useSelector(instructorSelector.selectInstructors);

  console.log(instructorData);
  const handleRowSelection = (data) => {
    console.log(data);
  };

  return (
    <InstructorManagementWrapper>
      <UserManagementTable
        data={instructorData}
        tableRowSelection={handleRowSelection}
        modalTitle={"Instructor Detail"}
        type={"Instructor"}
      />
    </InstructorManagementWrapper>
  );
}

export default InstructorManagement;
