package com.tpse86.student_funding_portal.controller;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FormController {

    private static final DateTimeFormatter FILE_STAMP = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");

    private final Path submissionsFile;
    private final Path uploadsDir;

    public FormController(
            @Value("${portal.submissions-file:submissions.txt}") String submissionsFile,
            @Value("${portal.uploads-dir:uploads}") String uploadsDir) {
        this.submissionsFile = Path.of(submissionsFile).toAbsolutePath();
        this.uploadsDir = Path.of(uploadsDir).toAbsolutePath();
    }

    @PostMapping("/api/submit")
    public ResponseEntity<Map<String, String>> handleSubmit(
            @RequestParam String studentFullName,
            @RequestParam String studentEmail,
            @RequestParam String supervisorName,
            @RequestParam String supervisorEmail,
            @RequestParam String studyDescription,
            @RequestParam BigDecimal participantCount,
            @RequestParam BigDecimal moneyPerParticipant,
            @RequestParam(defaultValue = "0") BigDecimal extraCosts,
            @RequestParam String fundsExplanation,
            @RequestParam("declarationPdf") MultipartFile declarationPdf) {

        if (declarationPdf.isEmpty() || !isPdf(declarationPdf)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please upload the signed Non-Funding Declaration as a PDF."));
        }

        LocalDateTime now = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        BigDecimal total = participantCount.multiply(moneyPerParticipant).add(extraCosts)
                .setScale(2, RoundingMode.HALF_UP);

        try {
            // Stored under a generated name; the user's file name is only recorded in the txt
            Files.createDirectories(uploadsDir);
            Path pdfPath = uploadsDir.resolve(
                    now.format(FILE_STAMP) + "-" + UUID.randomUUID().toString().substring(0, 8) + ".pdf");
            try (InputStream in = declarationPdf.getInputStream()) {
                Files.copy(in, pdfPath);
            }

            String entry = now
                    + " | studentFullName=" + oneLine(studentFullName)
                    + " | studentEmail=" + oneLine(studentEmail)
                    + " | supervisorName=" + oneLine(supervisorName)
                    + " | supervisorEmail=" + oneLine(supervisorEmail)
                    + " | participantCount=" + participantCount.toPlainString()
                    + " | moneyPerParticipant=" + moneyPerParticipant.toPlainString()
                    + " | extraCosts=" + extraCosts.toPlainString()
                    + " | totalRequestedFunds=" + total.toPlainString()
                    + " | studyDescription=" + oneLine(studyDescription)
                    + " | fundsExplanation=" + oneLine(fundsExplanation)
                    + " | declarationPdf=" + oneLine(declarationPdf.getOriginalFilename())
                    + " -> " + pdfPath;

            appendLine(entry + System.lineSeparator());

            return ResponseEntity.ok(Map.of(
                    "message", "Saved to txt file",
                    "savedTo", submissionsFile.toString(),
                    "pdfSavedTo", pdfPath.toString(),
                    "totalRequestedFunds", total.toPlainString(),
                    "entry", entry));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Could not save the application: " + e.getMessage()));
        }
    }

    // Keeps concurrent requests from mixing their lines
    private synchronized void appendLine(String line) throws IOException {
        Files.writeString(submissionsFile, line, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    }

    private static boolean isPdf(MultipartFile file) {
        String name = file.getOriginalFilename();
        return "application/pdf".equals(file.getContentType())
                || (name != null && name.toLowerCase().endsWith(".pdf"));
    }

    // Replaces line breaks so every submission stays on a single line
    private static String oneLine(String value) {
        return value == null ? "" : value.replaceAll("[\\r\\n]+", " ");
    }
}
