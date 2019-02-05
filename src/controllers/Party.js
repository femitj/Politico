import db from '../models/index';

class PartyController {
  static async createParty(req, res) {
    const createQuery = `INSERT INTO
    parties(name, hqAddress, logoUrl, createdBy, createdOn)
    VALUES($1, $2, $3, $4, $5)
    returning *`;

    const values = [
      req.body.name,
      req.body.hqAddress,
      req.body.logourl,
      req.user.id,
      new Date().getTime(),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const { id, name } = rows[0];
      return res.status(201).json({
        status: 201,
        message: 'Political party created',
        data: {
          id,
          name,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get all political parties
  static async getAllParties(req, res) {
    const getAllParties = 'SELECT * FROM parties where createdBy = $1';
    try {
      const { rows, rowCount } = await db.query(getAllParties, [req.user.id]);
      return res.status(200).json({
        status: 200,
        message: 'All political party record successfully retrieved',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // get a single political party
  static async getParty(req, res) {
    const text = 'SELECT * FROM parties WHERE party_id = $1 AND createdBy = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Political party not found',
        });
      }
      const { id, name, logourl } = rows[0];
      return res.status(200).json({
        status: 200,
        message: `Id:${req.params.id} exists, Political party found`,
        data: {
          id,
          name,
          logourl,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // update Political party name
  static async updatePartyName(req, res) {
    const updateNameQuery = `UPDATE parties SET name = $3 WHERE party_id = $1 AND createdBy = $2
    returning *`;
    const values = [
      req.params.id,
      req.user.id,
      req.body.name,
    ];
    try {
      const { rows } = await db.query(updateNameQuery, values);
      const { id, name } = rows[0];
      return res.status(200).json({
        status: 200,
        message: "Political party's name updated",
        data: {
          id,
          name,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // delete a record
  static async deleteParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE party_id = $1 AND createdBy = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'not deleted, party not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Political party deleted',
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default PartyController;
