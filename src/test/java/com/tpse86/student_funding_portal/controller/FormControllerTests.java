package com.tpse86.student_funding_portal.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

class FormControllerTests {

    @TempDir
    Path tempDir;

    private FormController controller() {
        return new FormController(
                tempDir.resolve("submissions.txt").toString(),
                tempDir.resolve("uploads").toString());
    }

    private ResponseEntity<Map<String, String>> submit(FormController controller, MockMultipartFile pdf) {
        return controller.handleSubmit(
                "Elena Vance", "e.vance@university.edu",
                "Prof. Dr. Henrik Müller", "h.muller@university.edu",
                "Line one\nline two",
                new BigDecimal("12"), new BigDecimal("15"), new BigDecimal("2.5"),
                "Participant fees",
                pdf);
    }

    @Test
    void savesApplicationToTxtAndPdfToUploads() throws Exception {
        MockMultipartFile pdf = new MockMultipartFile(
                "declarationPdf", "signed.pdf", "application/pdf", "%PDF-1.4 test".getBytes());

        ResponseEntity<Map<String, String>> response = submit(controller(), pdf);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("182.50", response.getBody().get("totalRequestedFunds"));

        List<String> lines = Files.readAllLines(tempDir.resolve("submissions.txt"), StandardCharsets.UTF_8);
        assertEquals(1, lines.size());
        String line = lines.get(0);
        assertTrue(line.contains("studentFullName=Elena Vance"));
        assertTrue(line.contains("supervisorName=Prof. Dr. Henrik Müller"));
        assertTrue(line.contains("studyDescription=Line one line two"));
        assertTrue(line.contains("totalRequestedFunds=182.50"));
        assertTrue(line.contains("declarationPdf=signed.pdf"));

        Path savedPdf = Path.of(response.getBody().get("pdfSavedTo"));
        assertTrue(savedPdf.startsWith(tempDir.resolve("uploads")));
        assertEquals("%PDF-1.4 test", Files.readString(savedPdf));
    }

    @Test
    void rejectsNonPdfUpload() {
        MockMultipartFile notPdf = new MockMultipartFile(
                "declarationPdf", "notes.txt", "text/plain", "hello".getBytes());

        ResponseEntity<Map<String, String>> response = submit(controller(), notPdf);

        assertEquals(400, response.getStatusCode().value());
        assertTrue(Files.notExists(tempDir.resolve("submissions.txt")));
    }
}
