package com.example.LqcSpringBoot.ut;

import com.example.LqcSpringBoot.mapper.MembeMapper;
import com.example.LqcSpringBoot.model.Membe;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

/**
 * @author：liuqingchen
 * @since：2020/05.22/13
 */
@Component
public class MainPartimportBean {

    @Autowired
   public MembeMapper membeMapper;

    public  void insertDB(InputStream fileInputStream) {
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream);// 创建工作薄
            Sheet sheet = workbook.getSheetAt(0);// 得到工作表
            Row row = null;// 对应excel的行
            Cell cell = null;// 对应excel的列
            String Var="";
            row = sheet.getRow((short)0);


            int totalRow = sheet.getLastRowNum();// 得到excel的总记录条数
            String name = "";//第一列
            String id = "";//第二列
            String enddata = "";//第三列
            String hyzh = "";//第四列
            String status = "";//五列
            String zc = "";//第六列
            String hytype = "";//第7列
            String xb = "";//第8列
            String gzdw = "";//第9列
            String mz = "";//第10列
            String zw = "";//第11列
            String txdz = "";//第12列
            String sjhm = "";//第13列
            String email = "";//第14列
            String csrq = "";//第15列
            String dp = "";//第16列
            String startdata = "";//第17列

            int x =0;
            for (short i = 1; i <=totalRow; i++) {
                Membe mp1 = new Membe();
                cell = sheet.getRow(i).getCell((short)0);
                sheet.getRow(i).getCell(0).setCellType(CellType.STRING);
                if(cell!=null){
                    name = sheet.getRow(i).getCell(0).getStringCellValue();
                    mp1.setName(name);
                }
                cell = sheet.getRow(i).getCell((short)1);
                sheet.getRow(i).getCell(1).setCellType(CellType.STRING);
                if(cell!=null){
                    id =sheet.getRow(i).getCell(1).getStringCellValue().replaceAll(" ","");
                    mp1.setId(id);

                }
                cell = sheet.getRow(i).getCell((short)2);
                sheet.getRow(i).getCell(2).setCellType(CellType.STRING);
                if(cell!=null){
                    enddata =sheet.getRow(i).getCell(2).getStringCellValue();
                    mp1.setEnddata(enddata);
                }
                cell = sheet.getRow(i).getCell((short)3);
                sheet.getRow(i).getCell(3).setCellType(CellType.STRING);
                if(cell!=null){
                    hyzh =sheet.getRow(i).getCell(3).getStringCellValue();
                    mp1.setHyzh(hyzh);
                }
                cell = sheet.getRow(i).getCell((short)4);
                sheet.getRow(i).getCell(4).setCellType(CellType.STRING);
                if(cell!=null){
                    status =sheet.getRow(i).getCell(4).getStringCellValue();
                     mp1.setStatus(status);
                }
                cell = sheet.getRow(i).getCell((short)5);
                sheet.getRow(i).getCell(5).setCellType(CellType.STRING);
                if(cell!=null){
                    zc =sheet.getRow(i).getCell(5).getStringCellValue();
                     mp1.setZc(zc);
                }

                cell = sheet.getRow(i).getCell((short)6);
                sheet.getRow(i).getCell(6).setCellType(CellType.STRING);
                if(cell!=null){
                    hytype =sheet.getRow(i).getCell(6).getStringCellValue();
                    mp1.setHytype(hytype);
                }
                cell = sheet.getRow(i).getCell((short)7);
                sheet.getRow(i).getCell(7).setCellType(CellType.STRING);
                if(cell!=null){
                    xb =sheet.getRow(i).getCell(7).getStringCellValue();
                    mp1.setXb(xb);
                }

                cell = sheet.getRow(i).getCell((short)8);
                sheet.getRow(i).getCell(8).setCellType(CellType.STRING);
                if(cell!=null){
                    gzdw =sheet.getRow(i).getCell(8).getStringCellValue();
                    mp1.setGzdw(gzdw);
                }
                cell = sheet.getRow(i).getCell((short)9);
                sheet.getRow(i).getCell(9).setCellType(CellType.STRING);
                if(cell!=null){
                    mz =sheet.getRow(i).getCell(9).getStringCellValue();
                    mp1.setMz(mz);
                }
                cell = sheet.getRow(i).getCell((short)10);
                sheet.getRow(i).getCell(10).setCellType(CellType.STRING);
                if(cell!=null){
                    zw =sheet.getRow(i).getCell(10).getStringCellValue();
                    mp1.setZw(zw);
                }
                cell = sheet.getRow(i).getCell((short)11);
                sheet.getRow(i).getCell(11).setCellType(CellType.STRING);
                if(cell!=null){
                    txdz =sheet.getRow(i).getCell(11).getStringCellValue();
                    mp1.setTxdz(txdz);
                }
                cell = sheet.getRow(i).getCell((short)12);
                sheet.getRow(i).getCell(12).setCellType(CellType.STRING);
                if(cell!=null){
                    sjhm =sheet.getRow(i).getCell(12).getStringCellValue();
                    mp1.setSjhm(sjhm);
                }

                cell = sheet.getRow(i).getCell((short)13);
                sheet.getRow(i).getCell(13).setCellType(CellType.STRING);
                if(cell!=null){
                    email =sheet.getRow(i).getCell(13).getStringCellValue();
                    mp1.setEmail(email);
                }
                cell = sheet.getRow(i).getCell((short)14);
                sheet.getRow(i).getCell(14).setCellType(CellType.STRING);
                if(cell!=null){
                    csrq =sheet.getRow(i).getCell(14).getStringCellValue();
                    mp1.setCsrq(csrq);
                }
                cell = sheet.getRow(i).getCell((short)15);
                sheet.getRow(i).getCell(15).setCellType(CellType.STRING);
                if(cell!=null){
                    dp =sheet.getRow(i).getCell(15).getStringCellValue();
                    mp1.setDp(dp);
                }
                cell = sheet.getRow(i).getCell((short)16);
                sheet.getRow(i).getCell(16).setCellType(CellType.STRING);
                if(cell!=null){
                    startdata =sheet.getRow(i).getCell(16).getStringCellValue();
                    mp1.setStartdata(startdata);
                }

                List<Membe> list = membeMapper.selectMembeById(id);
                if (list.size()==0) {
                    mp1.setGuid(UUID.randomUUID().toString());
                    membeMapper.insert(mp1);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
