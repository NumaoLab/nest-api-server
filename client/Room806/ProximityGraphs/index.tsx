import React from "react";
import { useEnhance } from "./enhance";
import { Proximity } from "@/client/common/Proximity";
import { Container, SubTitle, Grid } from "./styles";

export const ProximityGraphs: React.FC = () => {
  const { humanData, wheelChairData, slipperData, wearData } = useEnhance();

  return (
    <Container>
      <SubTitle>Proximity法</SubTitle>
      <hr />
      <Grid>
        <Proximity
          label={"人タグ"}
          container={humanData}
          filterNames={["NameTag1", "NameTag2", "NameTag3", "NameTag4"]}
          colors={["#79b636", "#0e2ecd", "#b061ee", "#fbba59"]}
        />
        <Proximity
          label={"服"}
          container={wearData}
          filterNames={["Waer1-1", "Waer1-2", "Waer2-1", "Waer2-2"]}
          colors={["#79b636", "#0e2ecd", "#b061ee", "#fbba59"]}
        />
        <Proximity
          label={"スリッパ"}
          container={slipperData}
          filterNames={["Slipper1", "Slipper2", "Slipper3", "Slipper4"]}
          colors={["#79b636", "#0e2ecd", "#b061ee", "#fbba59"]}
        />
        <Proximity
          label={"車椅子"}
          container={wheelChairData}
          filterNames={["Wheelchair1"]}
          colors={["#79b636"]}
        />
      </Grid>
    </Container>
  );
};
