import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for validation of calculator inputs
  
  app.post('/api/validate/gestational', (req, res) => {
    try {
      const { calculationType, date } = req.body;
      
      if (!calculationType || !date) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Dados insuficientes. Por favor, preencha todos os campos.' 
        });
      }
      
      // Basic date validation
      const inputDate = new Date(date);
      const today = new Date();
      
      if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Data inválida. Por favor, insira uma data válida.' 
        });
      }
      
      if (inputDate > today) {
        return res.status(400).json({ 
          valid: false, 
          message: 'A data não pode ser no futuro.' 
        });
      }
      
      return res.status(200).json({ valid: true });
    } catch (error) {
      console.error('Error validating gestational data:', error);
      return res.status(500).json({ 
        valid: false, 
        message: 'Erro ao validar os dados. Por favor, tente novamente.' 
      });
    }
  });
  
  app.post('/api/validate/fertility', (req, res) => {
    try {
      const { periodStart, periodEnd, cycleLength } = req.body;
      
      if (!periodStart || !periodEnd) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Dados insuficientes. Por favor, preencha todos os campos.' 
        });
      }
      
      // Basic date validation
      const startDate = new Date(periodStart);
      const endDate = new Date(periodEnd);
      const today = new Date();
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Data inválida. Por favor, insira datas válidas.' 
        });
      }
      
      if (startDate > today || endDate > today) {
        return res.status(400).json({ 
          valid: false, 
          message: 'As datas não podem ser no futuro.' 
        });
      }
      
      if (endDate < startDate) {
        return res.status(400).json({ 
          valid: false, 
          message: 'A data de fim deve ser após a data de início.' 
        });
      }
      
      if (cycleLength && (cycleLength < 21 || cycleLength > 45)) {
        return res.status(400).json({ 
          valid: false, 
          message: 'A duração do ciclo deve estar entre 21 e 45 dias.' 
        });
      }
      
      return res.status(200).json({ valid: true });
    } catch (error) {
      console.error('Error validating fertility data:', error);
      return res.status(500).json({ 
        valid: false, 
        message: 'Erro ao validar os dados. Por favor, tente novamente.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
