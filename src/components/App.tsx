import { useState } from "react";
import { SubjectContext } from "../contexts";
import type { Subject } from "../utils/utils";
import { GroupsContainer } from "./GroupsContainer";

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  return (
    <SubjectContext.Provider value={{ subjects, setSubjects }}>
      <GroupsContainer />
    </SubjectContext.Provider>
  );
}

export default App;
