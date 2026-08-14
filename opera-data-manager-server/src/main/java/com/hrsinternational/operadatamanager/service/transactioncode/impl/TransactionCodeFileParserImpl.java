package com.hrsinternational.operadatamanager.service.transactioncode.impl;

import com.hrsinternational.operadatamanager.dto.TransactionCodeFileRow;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeFileParser;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class TransactionCodeFileParserImpl implements TransactionCodeFileParser {

    private static final String CSV_EXTENSION = ".csv";
    private static final String XLS_EXTENSION = ".xls";
    private static final String XLSX_EXTENSION = ".xlsx";

    @Override
    public List<TransactionCodeFileRow> parse(MultipartFile file) {

        String filename = file.getOriginalFilename();

        if (filename == null || filename.isBlank()) {
            throw new IllegalArgumentException("File name is required.");
        }

        String lowerCaseFilename = filename.toLowerCase(Locale.ROOT);

        try {
            if (lowerCaseFilename.endsWith(CSV_EXTENSION)) {
                return parseCsv(file);
            }

            if (lowerCaseFilename.endsWith(XLS_EXTENSION)
                    || lowerCaseFilename.endsWith(XLSX_EXTENSION)) {
                return parseExcel(file);
            }

        } catch (IOException exception) {
            throw new IllegalArgumentException(
                    "Failed to parse transaction code file.",
                    exception
            );
        }

        throw new IllegalArgumentException(
                "Unsupported file format. Supported formats: CSV, XLS, XLSX."
        );
    }

    private List<TransactionCodeFileRow> parseCsv(MultipartFile file) throws IOException {

        List<TransactionCodeFileRow> rows = new ArrayList<>();

        try (
                Reader reader = new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8
                );

                CSVParser parser = CSVFormat.DEFAULT
                        .builder()
                        .setHeader()
                        .setSkipHeaderRecord(true)
                        .setTrim(true)
                        .build()
                        .parse(reader)
        ) {
            for (CSVRecord record : parser) {

                TransactionCodeFileRow row = new TransactionCodeFileRow();

                row.setCode(record.get("code"));
                row.setDescription(record.get("description"));
                row.setSubgroup(record.get("subgroup"));
                row.setTransactionType(record.get("transactionType"));
                row.setRevenueGroup(parseBoolean(record.get("revenueGroup")));
                row.setManualPosting(parseBoolean(record.get("manualPosting")));

                rows.add(row);
            }
        }

        return rows;
    }

    private List<TransactionCodeFileRow> parseExcel(MultipartFile file) throws IOException {

        List<TransactionCodeFileRow> rows = new ArrayList<>();

        try (
                InputStream inputStream = file.getInputStream();
                Workbook workbook = WorkbookFactory.create(inputStream)
        ) {
            Sheet sheet = workbook.getSheetAt(0);
            DataFormatter formatter = new DataFormatter();

            Row headerRow = sheet.getRow(0);

            if (headerRow == null) {
                return rows;
            }

            for (int rowIndex = 1;
                 rowIndex <= sheet.getLastRowNum();
                 rowIndex++) {

                Row row = sheet.getRow(rowIndex);

                if (row == null) {
                    continue;
                }

                TransactionCodeFileRow fileRow = new TransactionCodeFileRow();

                fileRow.setCode(getCellValue(row, 0, formatter));

                fileRow.setDescription(getCellValue(row, 1, formatter));

                fileRow.setSubgroup(getCellValue(row, 2, formatter));

                fileRow.setTransactionType(getCellValue(row, 3, formatter));

                fileRow.setRevenueGroup(parseBoolean(getCellValue(row, 4, formatter)));

                fileRow.setManualPosting(parseBoolean(getCellValue(row, 5, formatter)));

                rows.add(fileRow);
            }
        }

        return rows;
    }

    private String getCellValue(Row row, int cellIndex, DataFormatter formatter) {
        if (row.getCell(cellIndex) == null) {
            return null;
        }

        return formatter
                .formatCellValue(row.getCell(cellIndex))
                .trim();
    }

    private Boolean parseBoolean(String value) {

        if (value == null || value.isBlank()) {
            return false;
        }

        return switch (value.trim().toLowerCase(Locale.ROOT)) {
            case "true", "yes", "y", "1" -> true;
            case "false", "no", "n", "0" -> false;
            default -> throw new IllegalArgumentException(
                    "Invalid boolean value: " + value
            );
        };
    }
}
