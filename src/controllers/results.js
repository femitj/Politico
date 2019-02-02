import db from '../models/index';


class result {
  static async getResult(req, res) {
    const text = `SELECT
    candidate,
    COUNT (candidate)
    FROM
    votes
    WHERE office=$1
    GROUP BY
    candidate`;
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Political office not found',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Election results',
        data: rows,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default result;
