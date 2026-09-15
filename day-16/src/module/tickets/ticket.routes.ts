import { Router } from "express";

import { validateTicketQuery } from "../../middleware/ticketQuery.ts";
import { requireAuth } from "../../middleware/auth.middleware.ts";
import { validate } from "../../middleware/validation.middleware.ts";
import {
  createTicketSchema,
  listTicketsQuerySchema,
  ticketIdParamSchema,
} from "./ticket.schemas.ts";
import { ticketController } from "./ticket.controller.ts";
import { authorize } from "../../middleware/authorize.middleware.ts";

const ticketRoutes = Router();
ticketRoutes.use(requireAuth);
ticketRoutes.get(
  "/",
  validate({ query: listTicketsQuerySchema }),
  authorize("ticket", "read"),
  ticketController.list,
);
ticketRoutes.get(
  "/:id",
  validate({ params: ticketIdParamSchema }),
  authorize("ticket", "read"),
  ticketController.getById,
);
ticketRoutes.delete(
  "/:id",
  validate({ params: ticketIdParamSchema }),
  authorize("ticket", "delete"),
  ticketController.delete,
);
ticketRoutes.post(
  "/create",
  validate({ body: createTicketSchema }),
  authorize("ticket", "create"),
  ticketController.create,
);

export default ticketRoutes;
