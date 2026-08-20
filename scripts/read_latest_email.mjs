import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'

async function checkLatestEmail() {
  const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: 'muhammadaadilusmani@gmail.com',
      pass: 'fhhsueiamulwldfv',
    },
    logger: false,
  })

  await client.connect()
  const lock = await client.getMailboxLock('INBOX')

  try {
    const messages = await client.search({
      or: [
        { from: 'l1f22bscs0399@ucp.edu.pk' },
        { from: 'adilusmani@outlook.com' }
      ]
    })

    console.log(`Found ${messages.length} messages from authorized user.`)

    // Get the last 3 messages
    const recentUids = messages.slice(-3)
    for (const uid of recentUids) {
      const msg = await client.fetchOne(uid, { source: true, envelope: true })
      const parsed = await simpleParser(msg.source)
      console.log('--------------------------------------------------')
      console.log(`UID: ${uid}`)
      console.log(`Date: ${parsed.date}`)
      console.log(`From: ${parsed.from.text}`)
      console.log(`Subject: ${parsed.subject}`)
      console.log(`Text Body:`)
      console.log(parsed.text)
      console.log('--------------------------------------------------')
    }
  } finally {
    lock.release()
    await client.logout()
  }
}

checkLatestEmail()
