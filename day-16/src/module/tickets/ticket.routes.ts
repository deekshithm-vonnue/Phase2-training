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

/**
 * @openapi
 *  /api/tickets:
 *    get:
 *      summary: List tickets
 *      tags: [Tickets]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Ticket list
 *    post:
 *       summary: create a ticket
 *       tags: [Tickets]
 *       security:
 *        - bearerAuth: []
 *       requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required : [title, description]
 *              properties:
 *                title: {type: string}
 *                description: {type: string}
 *                priority:
 *                 type: string
 *                 enum: [LOW,MEDIUM,HIGH,URGENT]
 *       responses:
 *        200:
 *          description: Ticket created
 */

ticketRoutes.get(
  "/",
  validate({ query: listTicketsQuerySchema }),
  authorize("ticket", "read"),
  ticketController.list,
);

ticketRoutes.post(
  "/",
  validate({ body: createTicketSchema }),
  authorize("ticket", "create"),
  ticketController.create,
);

/**
 * @openapi
 * /api/tickets/{id}:
 *  get:
 *    summary: Retrive ticket by ID
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Ticket found
 *  delete:
 *    summary: delete ticket by ID
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *         description: Ticket deleted succesfully 
 */
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

export default ticketRoutes;
