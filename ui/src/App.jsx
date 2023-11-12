/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import IniciarSession from "./pages/login/IniciarSession";
import OlvidoPass from "./pages/login/OlvidoPass";
import Registro from "./pages/login/Registro";
import Navbar from "./pages/layouts/NavBar";
import GenerarReclamo from "./pages/reclamos/crearReclamo/GenerarReclamo";
import ReclamosList from "./pages/reclamos/ListReclamosUser";
import ReclamoDetalle from "./pages/reclamos/ReclamoDetalle";
import DashBoard from "./pages/dashboard/Index";

import PwaModal from "./components/InstallPWAModal";
import { ReclamoFormProvider } from "./context/formReclamoContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <>
      {isReadyForInstall && <PwaModal installApp={downloadApp} />}
      <ReclamoFormProvider>
        {sessionStorage.getItem("userData") && <Navbar />}
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuevo-reclamo"
            element={
              <ProtectedRoute>
                <GenerarReclamo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclamos-lista"
            element={
              <ProtectedRoute>
                <ReclamosList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclamo-detalle/:reclamoId"
            element={
              <ProtectedRoute>
                <ReclamoDetalle />
              </ProtectedRoute>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<IniciarSession />} />
          <Route path="/recuperar-pass" element={<OlvidoPass />} />
        </Routes>
      </ReclamoFormProvider>
    </>
  );
}

export default App;
