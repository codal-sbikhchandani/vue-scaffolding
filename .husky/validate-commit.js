import fs from 'fs'

const commitMsgFile = process.argv[2]

if (!commitMsgFile) {
  console.error('Error: No commit message file provided.')
  process.exit(1)
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim()

const commitRegex = /^PVA-\d+ #time \d+[hm]\s/

if (!commitRegex.test(commitMsg)) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    '\n================================================================',
  )
  console.error(
    '\x1b[31m%s\x1b[0m',
    'Bad commit message, see example of smart commit message: PROJ-123 #time 1h commit message',
  )
  console.error(
    '\x1b[31m%s\x1b[0m',
    '================================================================\n',
  )

  process.exit(1)
}

process.exit(0)
