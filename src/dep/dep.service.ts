import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDepClient } from './soap-client.util';
import * as csvParse from 'csv-parse/sync';

@Injectable()
export class DepService {
  private readonly logger = new Logger(DepService.name);
  constructor(private readonly configService: ConfigService) {}

  async getMemberExtractReport() {
    try {
      const username = this.configService.get<string>('PMI_DEP_USERNAME');
      const password = this.configService.get<string>('PMI_DEP_PASSWORD');
      if (!username || !password) {
        return {
          success: false,
          message: 'Missing PMI_DEP_USERNAME or PMI_DEP_PASSWORD',
          errorCode: 'AUTH_401',
        };
      }
      const client = await getDepClient(username, password);
      const [result, rawResponse, soapHeader, rawRequest] = await client.GetMemberExtractReportAsync({});
      this.logger.log('RAW SOAP RESPONSE:', rawResponse);
      const extractFile = result?.ExtractFile;
      const dataDate = result?.DataDate;
      const memberCount = result?.MemberCount;
      let members = [];
      if (extractFile) {
        members = csvParse.parse(extractFile, { columns: true, skip_empty_lines: true });
      }
      return {
        success: true,
        message: '',
        rawSoapResponse: rawResponse,
        dataDate,
        memberCount,
        members,
      };
    } catch (error) {
      this.logger.error('Error in getMemberExtractReport', error);
      return {
        success: false,
        message: error.message || 'Unknown error',
        errorCode: error.code || 'DEP_500',
      };
    }
  }

  async getMemberExtractReportLastRun() {
    try {
      const username = this.configService.get<string>('PMI_DEP_USERNAME');
      const password = this.configService.get<string>('PMI_DEP_PASSWORD');
      if (!username || !password) {
        return {
          success: false,
          message: 'Missing PMI_DEP_USERNAME or PMI_DEP_PASSWORD',
          errorCode: 'AUTH_401',
        };
      }
      const client = await getDepClient(username, password);
      const [result, rawResponse, soapHeader, rawRequest] = await client.GetMemberExtractReportLastRunAsync({});
      this.logger.log('RAW SOAP RESPONSE:', rawResponse);
      return {
        success: true,
        message: '',
        rawSoapResponse: rawResponse,
        dataDate: result?.DataDate,
        memberCount: result?.MemberCount,
      };
    } catch (error) {
      this.logger.error('Error in getMemberExtractReportLastRun', error);
      return {
        success: false,
        message: error.message || 'Unknown error',
        errorCode: error.code || 'DEP_500',
      };
    }
  }
}
