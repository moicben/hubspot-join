// Données de transaction pour l'entreprise
export default function handler(req, res) {
  if (req.method === 'GET') {
    const companyInfo = {
      name: 'TechCorp Solutions',
      email: 'contact@techcorp-solutions.com',
      industry: 'Technologie',
      size: '51-200 employés',
      adminName: 'Marie Dubois',
      adminEmail: 'marie.dubois@techcorp-solutions.com',
      invitedBy: 'Jean Martin',
      invitedDate: '15 janvier 2024'
    }

    res.status(200).json({ companyInfo })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
