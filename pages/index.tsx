import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProTip from "src/ProTip";
import Link from "src/Link";
import Header from "components/Layout/header";
import Layout from "components/Layout/Layout";

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
        </Box>
      </Container>
    </Layout>
  );
}
