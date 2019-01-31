import db from '../models/index';


class result {
  static async getResult(req, res) {
    const text = `SELECT DISTINCT ON (office) 
                  office, candidate, count(candidate) result
                  FROM votes
                  GROUP BY ((office, candidate), (office))
                  ORDER BY office, result DESC
                  `;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Political office not found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Election results',
        data: rows,
      });
    } 
    catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default result;
