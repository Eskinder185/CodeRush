import type { LearningPath, LearningModule } from '../types'
import { q } from './helpers'

type M = Omit<LearningModule, 'scenarioIds'> & { scenarioIds?: string[] }
const m = (x: M): LearningModule => ({ scenarioIds: [], ...x })

export const powershellPath: LearningPath = {
  id: 'powershell',
  title: 'Windows PowerShell',
  tagline: 'Objects, pipelines, and real administration.',
  description: 'A 27-module journey from your first cmdlet to defensive auditing and incident triage on Windows. Every example is read-only unless clearly marked.',
  difficulty: 'mixed',
  estimatedHours: 16,
  objectives: [
    'Discover commands and read help without searching the web.',
    'Use the object pipeline to filter, sort, select, and export data.',
    'Inspect processes, services, events, and network configuration.',
    'Audit accounts, permissions, firewall settings, and persistence safely.',
  ],
  prerequisites: ['A Windows computer helps but is not required: every exercise has a simulated terminal.'],
  accent: 'sky',
  icon: 'powershell',
  completion: 'Complete each module quiz with at least 50% and reach "Practiced" mastery on its commands.',
  modules: [
    // Beginner
    m({
      id: 'ps.intro', title: 'Introduction to PowerShell', level: 'beginner',
      outcome: 'Tell Windows PowerShell 5.1 from PowerShell 7 and identify your session.',
      summary: 'Editions, versions, and hosts.',
      concept: [
        'PowerShell is a shell and scripting language built on .NET. Windows includes Windows PowerShell 5.1. PowerShell 7 is a separate, cross-platform install.',
        'Unlike text-based shells, PowerShell commands return objects with properties. That changes how you filter and format results.',
      ],
      commandIds: ['ps.psversiontable', 'ps.get-host'],
      quiz: [
        q('psi-1', 'Which PSEdition value means PowerShell 7?', ['Desktop', 'Core', 'Server', 'Modern'], 1, 'Core is PowerShell 6 and later. Desktop is Windows PowerShell 5.1.'),
        q('psi-2', 'What do PowerShell commands pass through the pipeline?', ['Plain text', 'Objects', 'Bytes only', 'Files'], 1, 'Objects with properties and methods.'),
      ],
    }),
    m({
      id: 'ps.cmdlets', title: 'Understanding cmdlets', level: 'beginner',
      outcome: 'Read and predict cmdlet names from the Verb-Noun pattern.',
      summary: 'Verbs, nouns, and what a cmdlet returns.',
      concept: [
        'Cmdlets are named Verb-Noun: Get-Service, Restart-Service, New-Item. Get verbs read. Set, New, and Remove change things.',
        'Knowing the pattern lets you guess. If you know Get-NetAdapter, you can look for Disable-NetAdapter.',
      ],
      commandIds: ['ps.get-verb', 'ps.get-date'],
      quiz: [
        q('psc-1', 'Which verb should only read information?', ['Set', 'Get', 'Remove', 'New'], 1, 'Get verbs retrieve data without changing it.'),
        q('psc-2', 'What does (Get-Date).DayOfWeek show?', ['An error', 'The DayOfWeek property of the date object', 'The text "DayOfWeek"', 'Tomorrow'], 1, 'Parentheses run the command first, then the property is read.'),
      ],
    }),
    m({
      id: 'ps.help', title: 'Getting help', level: 'beginner',
      outcome: 'Read syntax diagrams and examples for any cmdlet.',
      summary: 'Get-Help, -Examples, and Update-Help.',
      concept: [
        'Get-Help shows syntax, descriptions, and examples. Parameters in [brackets] are optional. <string[]> means one or more strings.',
        'If help looks thin, the local files are not installed. Update-Help downloads them, or add -Online to read the web version.',
      ],
      commandIds: ['ps.get-help', 'ps.get-help-examples', 'ps.update-help'],
      quiz: [
        q('psh-1', 'In SYNTAX, what do square brackets around a parameter mean?', ['Required', 'Optional', 'Deprecated', 'Array'], 1, 'Brackets mark optional parts.'),
        q('psh-2', 'Which switch shows only examples?', ['-Full', '-Detailed', '-Examples', '-Online'], 2, '-Examples filters the help topic.'),
      ],
    }),
    m({
      id: 'ps.explore', title: 'Exploring commands', level: 'beginner',
      outcome: 'Find the cmdlet you need by noun, wildcard, or alias.',
      summary: 'Get-Command and Get-Alias.',
      concept: [
        'Get-Command searches every available command. Filter with -Noun, -Verb, -Module, or a wildcard name such as *dns*.',
        'Aliases like ls and dir are shortcuts for full cmdlets. Use full names in scripts so they are readable.',
      ],
      commandIds: ['ps.get-command-noun', 'ps.get-command-wildcard', 'ps.get-alias'],
      quiz: [
        q('pse-1', 'Which command lists every cmdlet with the noun Service?', ['Get-Help Service', 'Get-Command -Noun Service', 'Get-Service -List', 'Find-Command Service'], 1, '-Noun filters on the second half of the name.'),
        q('pse-2', 'Why does "ls -la" fail in PowerShell on Windows?', ['ls is not defined', 'ls is Get-ChildItem, which has no -la parameter', 'It needs admin rights', 'It works fine'], 1, 'Aliases do not translate Unix flags.'),
      ],
    }),
    m({
      id: 'ps.files', title: 'Working with files and directories', level: 'beginner',
      outcome: 'Navigate, list, create, copy, read, test, and safely remove files.',
      summary: 'Location, child items, content, and -WhatIf.',
      concept: [
        'PowerShell treats the file system as a provider. The same cmdlets, such as Get-ChildItem and Get-Item, also work on the registry and certificate store.',
        'Before any delete, run it with -WhatIf. It prints what would happen without doing it.',
      ],
      commandIds: ['ps.get-location', 'ps.set-location', 'ps.get-childitem', 'ps.get-childitem-recurse', 'ps.new-item-directory', 'ps.copy-item', 'ps.remove-item-whatif', 'ps.get-content-tail', 'ps.test-path'],
      quiz: [
        q('psf-1', 'Which parameter previews a change without making it?', ['-Confirm', '-WhatIf', '-Force', '-Verbose'], 1, '-WhatIf simulates.'),
        q('psf-2', 'How do you read the last 20 lines of a log?', ['Get-Content log -Head 20', 'Get-Content log -Tail 20', 'Select-String log -Last 20', 'Get-Item log -Tail 20'], 1, '-Tail reads from the end.'),
        q('psf-3', 'What does Test-Path return?', ['The file contents', 'True or False', 'The full path', 'An error if missing'], 1, 'It returns a Boolean.'),
      ],
    }),
    m({
      id: 'ps.pipelines', title: 'Understanding pipelines', level: 'beginner',
      outcome: 'Chain cmdlets to filter, sort, limit, group, and measure objects.',
      summary: 'Where-Object, Sort-Object, Select-Object, Group-Object, and Measure-Object.',
      concept: [
        'The pipeline passes whole objects. Sort-Object CPU reads the CPU property directly, so you never parse text columns.',
        'Filter as early as possible. Fewer objects flowing through the pipeline means faster commands.',
      ],
      commandIds: ['ps.top-cpu', 'ps.where-running', 'ps.measure-object-sum', 'ps.group-object'],
      quiz: [
        q('psp-1', 'Which operator tests equality in PowerShell?', ['=', '==', '-eq', 'eq'], 2, 'Comparison operators start with a hyphen.'),
        q('psp-2', 'Which cmdlet keeps only the first five objects?', ['Sort-Object -Top 5', 'Select-Object -First 5', 'Where-Object -First 5', 'Measure-Object 5'], 1, 'Select-Object -First limits the output.'),
      ],
    }),
    m({
      id: 'ps.objects', title: 'Objects and properties', level: 'beginner',
      outcome: 'Discover properties with Get-Member and choose what to display.',
      summary: 'Get-Member, Select-Object, and Format-List.',
      concept: [
        'The default table shows only a few properties. Get-Member reveals everything an object offers.',
        'Format-* cmdlets produce display output. Use them last, never before Export-Csv or other processing.',
      ],
      commandIds: ['ps.get-member', 'ps.select-properties', 'ps.format-list'],
      quiz: [
        q('pso-1', 'Which cmdlet lists an object\'s properties and methods?', ['Get-Help', 'Get-Member', 'Get-Property', 'Show-Object'], 1, 'Get-Member, alias gm.'),
        q('pso-2', 'Why not pipe Format-Table into Export-Csv?', ['It is slow', 'Format output is display objects, not data', 'CSV does not support tables', 'It is fine'], 1, 'The CSV would contain formatting objects.'),
      ],
    }),
    m({
      id: 'ps.variables', title: 'Variables and data types', level: 'beginner',
      outcome: 'Store results in variables, read environment variables, and convert types.',
      summary: '$variables, $env:, and type casts.',
      concept: [
        'Variables start with $. They hold any object, including whole collections returned by a cmdlet.',
        'Types matter: "10" is a string and 10 is a number. Cast with [int] or [datetime] when comparing values.',
      ],
      commandIds: ['ps.variable-assign', 'ps.env-var', 'ps.gettype'],
      quiz: [
        q('psv-1', 'How do you read the COMPUTERNAME environment variable?', ['%COMPUTERNAME%', '$COMPUTERNAME', '$env:COMPUTERNAME', 'env COMPUTERNAME'], 2, 'Environment variables live on the env: drive.'),
        q('psv-2', 'Is "10" -gt "9" True?', ['Yes', 'No, strings compare character by character', 'It errors', 'Only in PowerShell 7'], 1, 'As strings, "1" sorts before "9".'),
      ],
    }),
    // Intermediate
    m({
      id: 'ps.processes', title: 'Processes and services', level: 'intermediate',
      outcome: 'Inspect processes and services, and restart services safely.',
      summary: 'Get-Process, Get-Service, Stop-Process -WhatIf, and Restart-Service.',
      concept: [
        'Get-Process and Get-Service return objects you can filter and sort. A process path and start time often explain what it is.',
        'Changing services requires an elevated session. Check the current state before changing it.',
      ],
      commandIds: ['ps.get-process', 'ps.get-process-id', 'ps.stop-process-whatif', 'ps.get-service', 'ps.get-service-name', 'ps.restart-service'],
      quiz: [
        q('psps-1', 'Which property tells you where a process executable lives?', ['Id', 'Path', 'CPU', 'Handles'], 1, 'Path is the executable location.'),
        q('psps-2', 'What does CPU(s) in Get-Process output represent?', ['Current CPU percent', 'Total processor seconds used', 'Number of cores', 'Priority'], 1, 'It is cumulative processor time.'),
      ],
      scenarioIds: ['sc.ps.slow-machine'],
    }),
    m({
      id: 'ps.sysinfo', title: 'System information', level: 'intermediate',
      outcome: 'Collect OS, hardware, disk, and update information.',
      summary: 'Get-ComputerInfo, Get-CimInstance, and Get-HotFix.',
      concept: [
        'CIM (WMI) classes describe the operating system and hardware. Get-CimInstance replaces the older Get-WmiObject, which PowerShell 7 removed.',
        'Use -Filter to let WMI do the filtering, which is faster than Where-Object.',
      ],
      commandIds: ['ps.get-computerinfo', 'ps.cim-os', 'ps.cim-disk', 'ps.get-hotfix'],
      quiz: [
        q('pssi-1', 'Which cmdlet replaces Get-WmiObject?', ['Get-WMI', 'Get-CimInstance', 'Get-ComputerInfo', 'Invoke-Wmi'], 1, 'Get-CimInstance works in 5.1 and 7.'),
        q('pssi-2', 'What does DriveType 3 mean in Win32_LogicalDisk?', ['Network drive', 'Local fixed disk', 'CD-ROM', 'RAM disk'], 1, '3 is a local disk.'),
      ],
    }),
    m({
      id: 'ps.winnet', title: 'Windows networking', level: 'intermediate',
      outcome: 'Read addresses, gateways, routes, and ARP entries with PowerShell.',
      summary: 'Get-NetIPConfiguration, Get-NetIPAddress, Get-NetRoute, and Get-NetNeighbor.',
      concept: [
        'The NetTCPIP module returns network settings as objects. Get-NetIPConfiguration is the quick overview, and the others give detail.',
        'An address in 169.254.0.0/16 means DHCP failed and Windows assigned itself an address.',
      ],
      commandIds: ['ps.get-netipconfiguration', 'ps.get-netipaddress', 'ps.get-netroute-default', 'ps.get-netroute', 'ps.get-netneighbor'],
      quiz: [
        q('psn-1', 'What does a 169.254.x.x address indicate?', ['A static address', 'DHCP failed', 'A VPN connection', 'IPv6'], 1, 'It is an automatic private (APIPA) address.'),
        q('psn-2', 'Which prefix selects the default route?', ['0.0.0.0/0', '255.255.255.255/32', '127.0.0.0/8', '169.254.0.0/16'], 0, '0.0.0.0/0 matches every destination.'),
      ],
      scenarioIds: ['sc.ps.no-ip'],
    }),
    m({
      id: 'ps.dns', title: 'DNS troubleshooting', level: 'intermediate',
      outcome: 'Check DNS servers, resolve names, inspect the cache, and test specific servers.',
      summary: 'Get-DnsClientServerAddress, Resolve-DnsName, and the DNS cache.',
      concept: [
        'Resolve-DnsName returns structured records and can target a server with -Server and a type with -Type.',
        'Before clearing the cache, record what it contains. Cached entries are useful evidence.',
      ],
      commandIds: ['ps.get-dnsclientserveraddress', 'ps.resolve-dnsname', 'ps.resolve-dnsname-type', 'ps.get-dnsclientcache', 'ps.clear-dnsclientcache'],
      quiz: [
        q('psd-1', 'Which parameter queries a particular DNS server?', ['-DnsServer', '-Server', '-Target', '-NameServer'], 1, 'Resolve-DnsName -Server.'),
        q('psd-2', 'Which cmdlet is the PowerShell version of ipconfig /flushdns?', ['Reset-Dns', 'Clear-DnsClientCache', 'Remove-DnsCache', 'Flush-Dns'], 1, 'Clear-DnsClientCache.'),
      ],
      scenarioIds: ['sc.ps.dns-diagnose'],
    }),
    m({
      id: 'ps.adapters', title: 'Network adapters', level: 'intermediate',
      outcome: 'Check adapter status, link speed, MAC addresses, and traffic counters.',
      summary: 'Get-NetAdapter and Get-NetAdapterStatistics.',
      concept: [
        'If an adapter is Disconnected, there is no link and nothing above layer 1 matters yet.',
        'Counters tell you whether traffic flows at all.',
      ],
      commandIds: ['ps.get-netadapter', 'ps.get-netadapterstatistics'],
      quiz: [
        q('psa-1', 'Get-NetAdapter shows Status "Disconnected". What do you check?', ['DNS', 'Cable or Wi-Fi association', 'The routing table', 'The firewall'], 1, 'No link means a physical or wireless problem.'),
      ],
    }),
    m({
      id: 'ps.tcp', title: 'TCP connections', level: 'intermediate',
      outcome: 'Test ports, trace routes, and list listening and established connections.',
      summary: 'Test-NetConnection, Test-Connection, and Get-NetTCPConnection.',
      concept: [
        'Test-NetConnection with -Port tests the exact service an application needs. TcpTestSucceeded tells you whether the port answered.',
        'Get-NetTCPConnection shows each socket and its OwningProcess, which links traffic to programs.',
      ],
      commandIds: ['ps.test-netconnection-port', 'ps.test-netconnection-trace', 'ps.test-connection', 'ps.get-nettcpconnection-listen', 'ps.get-nettcpconnection-established', 'ps.get-netudpendpoint'],
      quiz: [
        q('pst-1', 'PingSucceeded is True and TcpTestSucceeded is False. What is likely?', ['DNS failure', 'The port is closed or filtered', 'No network', 'The host is down'], 1, 'The host answers, the port does not.'),
        q('pst-2', 'Which property links a connection to a process?', ['RemotePort', 'OwningProcess', 'State', 'AppliedSetting'], 1, 'OwningProcess is the PID.'),
      ],
      scenarioIds: ['sc.ps.port-test'],
    }),
    m({
      id: 'ps.events', title: 'Event logs', level: 'intermediate',
      outcome: 'Query System and Security logs efficiently and interpret key event IDs.',
      summary: 'Get-WinEvent with -LogName and -FilterHashtable.',
      concept: [
        'Windows logs events with an ID, level, provider, and message. Learning a few IDs helps: 7031 service crash, 4624 logon, 4625 failed logon, 4740 lockout.',
        'A filter hashtable is evaluated by the event log service, which is much faster than piping everything into Where-Object.',
      ],
      commandIds: ['ps.get-winevent-system', 'ps.get-winevent-level', 'ps.get-winevent-4625'],
      quiz: [
        q('psev-1', 'Which event ID records a failed logon?', ['4624', '4625', '4740', '7036'], 1, '4625 is "An account failed to log on".'),
        q('psev-2', 'Which Level number is Error?', ['1', '2', '3', '4'], 1, '1 Critical, 2 Error, 3 Warning, 4 Information.'),
      ],
      scenarioIds: ['sc.ps.review-events'],
    }),
    m({
      id: 'ps.acl', title: 'File permissions', level: 'intermediate',
      outcome: 'Read NTFS owners and access rules and spot overly broad permissions.',
      summary: 'Get-Acl and its Access rules.',
      concept: [
        'Each NTFS file has an owner and a list of access rules. A rule grants or denies rights such as Read, Modify, or FullControl to an identity.',
        'Broad rules for Everyone or Users on sensitive files are a common finding.',
      ],
      commandIds: ['ps.get-acl', 'ps.get-acl-access'],
      quiz: [
        q('psacl-1', 'Which identity on a sensitive file is a red flag with Modify rights?', ['SYSTEM', 'Administrators', 'Everyone', 'The file owner'], 2, 'Everyone includes all authenticated users.'),
      ],
    }),
    m({
      id: 'ps.secinspect', title: 'Security inspection', level: 'intermediate',
      outcome: 'Check execution policy, Defender, firewall profiles and rules, and local accounts.',
      summary: 'The core defensive health checks on a Windows endpoint.',
      concept: [
        'A quick endpoint review covers antivirus status, firewall profiles, inbound allow rules, local accounts, and administrators.',
        'Execution policy prevents accidental script runs but is not a security boundary.',
      ],
      commandIds: ['ps.get-executionpolicy', 'ps.get-mpcomputerstatus', 'ps.get-netfirewallprofile', 'ps.get-netfirewallrule', 'ps.get-localuser', 'ps.get-localgroup', 'ps.get-localgroupmember'],
      quiz: [
        q('pssec-1', 'Is execution policy a security boundary?', ['Yes', 'No, it prevents accidental execution only', 'Only RemoteSigned is', 'Only on servers'], 1, 'Microsoft documents it as a safety feature, not a boundary.'),
        q('pssec-2', 'Which group gives full control of a computer?', ['Users', 'Remote Desktop Users', 'Administrators', 'Backup Operators'], 2, 'Administrators have complete access.'),
      ],
    }),
    m({
      id: 'ps.scripting', title: 'Scripting fundamentals', level: 'intermediate',
      outcome: 'Use loops, conditions, and text search in scripts.',
      summary: 'ForEach-Object, if/else, and Select-String.',
      concept: [
        '$_ is the current object inside a script block. ForEach-Object runs the block for each pipeline item.',
        'Select-String searches text with regular expressions and returns match objects with file and line numbers.',
      ],
      commandIds: ['ps.foreach-object', 'ps.if-test-path', 'ps.select-string'],
      quiz: [
        q('psscr-1', 'What is $_ inside ForEach-Object?', ['The first object', 'The current pipeline object', 'The last error', 'An empty value'], 1, '$_ or $PSItem is the current item.'),
      ],
    }),
    // Advanced
    m({
      id: 'ps.functions', title: 'PowerShell functions', level: 'advanced',
      outcome: 'Write named functions with typed parameters.',
      summary: 'function, param, and approved verbs.',
      concept: [
        'A function packages commands under a name. A param block declares typed inputs, so bad values are rejected early.',
        'Use approved verbs for function names so they feel native and do not trigger warnings when exported.',
      ],
      commandIds: ['ps.function-basic', 'ps.function-param'],
      quiz: [
        q('psfn-1', 'What does [int]$Port do in a param block?', ['Makes Port optional', 'Requires Port to convert to an integer', 'Sets Port to 0', 'Hides Port'], 1, 'The type constraint converts or rejects input.'),
      ],
    }),
    m({
      id: 'ps.errors', title: 'Structured error handling', level: 'advanced',
      outcome: 'Catch errors deliberately and control how cmdlets report them.',
      summary: 'try/catch and -ErrorAction.',
      concept: [
        'Most cmdlet errors are non-terminating, so try/catch never sees them unless you add -ErrorAction Stop.',
        'SilentlyContinue hides errors. Use it only for errors you expect and understand.',
      ],
      commandIds: ['ps.try-catch', 'ps.erroraction'],
      quiz: [
        q('pserr-1', 'Why might catch never run?', ['catch is optional', 'The error was non-terminating', 'try blocks are disabled', 'Errors are always terminating'], 1, 'Add -ErrorAction Stop.'),
      ],
    }),
    m({
      id: 'ps.filtering', title: 'Pipeline filtering', level: 'advanced',
      outcome: 'Choose the fastest place to filter and summarize large data sets.',
      summary: 'Provider filters, FilterHashtable, Where-Object, and Group-Object.',
      concept: [
        'Filter at the source when you can: -Filter on Get-ChildItem, -Filter on CIM queries, and -FilterHashtable on Get-WinEvent. Where-Object is flexible but processes every object.',
        'Group-Object turns long lists into quick summaries.',
      ],
      commandIds: ['ps.get-winevent-level', 'ps.where-running', 'ps.group-object', 'ps.select-string'],
      quiz: [
        q('psflt-1', 'Which is faster on a large event log?', ['Get-WinEvent | Where-Object Id -eq 4625', 'Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4625}', 'They are the same', 'Get-EventLog'], 1, 'Server-side filtering avoids sending every event to PowerShell.'),
      ],
    }),
    m({
      id: 'ps.remote', title: 'Remote administration concepts', level: 'advanced',
      outcome: 'Understand WinRM remoting and run read-only commands on servers you administer.',
      summary: 'Test-WSMan and Invoke-Command.',
      concept: [
        'PowerShell remoting uses WS-Management over WinRM. Test-WSMan checks the listener. Invoke-Command runs a script block remotely and returns deserialized objects.',
        'Remote administration requires authorization on the target. Practice in a lab you control.',
      ],
      commandIds: ['ps.test-wsman', 'ps.invoke-command'],
      quiz: [
        q('psrem-1', 'What protocol does PowerShell remoting use on Windows by default?', ['SSH', 'WS-Management over WinRM', 'RDP', 'SMB'], 1, 'WinRM, on ports 5985 and 5986.'),
        q('psrem-2', 'How do you use a local variable inside a remote script block?', ['$global:', '$using:', '$remote:', 'It works automatically'], 1, '$using: passes local values.'),
      ],
    }),
    m({
      id: 'ps.audit', title: 'Defensive system auditing', level: 'advanced',
      outcome: 'Audit accounts, scheduled tasks, startup entries, and file hashes.',
      summary: 'Stale accounts and autostart review.',
      concept: [
        'Audits look for things that should not be there: unused administrator accounts, unexpected scheduled tasks, unknown startup programs.',
        'Record findings with evidence such as hashes and paths, then follow your change process to fix them.',
      ],
      commandIds: ['ps.localuser-lastlogon', 'ps.get-scheduledtask', 'ps.cim-startup', 'ps.get-filehash'],
      quiz: [
        q('psaud-1', 'Which finding is most urgent?', ['A disabled Guest account', 'An enabled, unused administrator account', 'A Microsoft scheduled task', 'An old KB update'], 1, 'Unused privileged access is pure risk.'),
      ],
      scenarioIds: ['sc.ps.who-is-admin'],
    }),
    m({
      id: 'ps.config', title: 'Configuration inspection', level: 'advanced',
      outcome: 'Read registry Run keys and service binaries to understand what starts automatically.',
      summary: 'Get-ItemProperty on Run keys and Win32_Service paths.',
      concept: [
        'Programs persist through Run keys, services, scheduled tasks, and startup folders. Reading them is safe. Editing them belongs in a lab or a change window.',
        'Service binary paths outside Windows and Program Files, or unquoted paths with spaces, deserve a closer look.',
      ],
      commandIds: ['ps.run-keys', 'ps.cim-autostart-services', 'ps.get-executionpolicy'],
      quiz: [
        q('pscfg-1', 'Which drive refers to HKEY_LOCAL_MACHINE?', ['HKCU:', 'HKLM:', 'Registry:', 'LM:'], 1, 'HKLM: is the local machine hive.'),
      ],
    }),
    m({
      id: 'ps.automation', title: 'Automation patterns', level: 'advanced',
      outcome: 'Export and import structured data and serialize results to JSON.',
      summary: 'Export-Csv, Import-Csv, and ConvertTo-Json.',
      concept: [
        'Select the properties you want, then export. CSV suits spreadsheets and inventories. JSON suits APIs and nested data.',
        'Import-Csv turns rows into objects, so a spreadsheet of servers becomes a list you can loop over.',
      ],
      commandIds: ['ps.export-csv', 'ps.import-csv', 'ps.convertto-json'],
      quiz: [
        q('psaut-1', 'What type is every value from Import-Csv?', ['Integer', 'String', 'Object', 'Boolean'], 1, 'CSV has no types, so values are strings.'),
      ],
    }),
    m({
      id: 'ps.triage', title: 'Incident triage scenarios', level: 'advanced',
      outcome: 'Collect process, file, network, and persistence evidence in the right order.',
      summary: 'Evidence-first investigation of a suspicious process.',
      concept: [
        'Collect volatile evidence first: running processes, command lines, network connections. Then collect files and hashes. Then look for persistence.',
        'Do not stop processes or delete files yourself unless the response plan says so.',
      ],
      commandIds: ['ps.get-process-id', 'ps.cim-process', 'ps.get-filehash', 'ps.scheduledtask-action'],
      quiz: [
        q('pstri-1', 'What should you collect first?', ['File hashes', 'Running processes and connections', 'Registry exports', 'Backups'], 1, 'Volatile data disappears first.'),
      ],
      scenarioIds: ['sc.ps.suspicious-process', 'sc.ps.persistence'],
    }),
    m({
      id: 'ps.advanced-troubleshooting', title: 'Advanced troubleshooting exercises', level: 'advanced',
      outcome: 'Solve multi-step Windows problems end to end.',
      summary: 'Ports, DNS, events, and lockouts.',
      concept: ['These scenarios combine networking, events, and accounts. Record what each command proves before moving to the next.'],
      commandIds: [],
      quiz: [
        q('psadv-1', 'An account locks out every 30 minutes from one old device. What is the likely cause?', ['A targeted attack', 'Saved stale credentials', 'A failing disk', 'DNS'], 1, 'Regular retries from one client point to a saved password.'),
      ],
      scenarioIds: ['sc.ps.port-test', 'sc.ps.dns-diagnose', 'sc.ps.review-events', 'sc.sec.windows-failed-logons'],
    }),
  ],
}
