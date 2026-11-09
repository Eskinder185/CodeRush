import { define, ps } from './helpers'

const MGMT = 'Microsoft.PowerShell.Management'
const NET = 'NetTCPIP'
const WIN = 'Windows 8 or Windows Server 2012 and later.'

/** PowerShell for processes, services, system information, event logs, and Windows networking. */
export const powershellSystem = define('powershell', [
  // ---------------- Processes and services ----------------
  {
    id: 'ps.get-process',
    command: 'Get-Process',
    title: 'List running processes',
    category: 'processes',
    subcategory: 'Processes and services',
    difficulty: 'beginner',
    objective: 'See every running process with memory and CPU use.',
    summary: 'Lists running processes with handles, memory, CPU time, ID, and name.',
    whenToUse: 'When you want to know what is running, or find a process ID.',
    syntax: [{ token: 'Get-Process', meaning: 'get processes; aliases ps, gps' }],
    sampleOutput: ` NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     24     6.12      18.40       0.42    6644   1 notepad
     38   188.03     201.44     240.90    5560   1 Code
     22    74.12      96.21     118.40     932   0 MsMpEng
     12     2.31       9.88       0.05     812   0 svchost`,
    mistakes: ['Reading CPU(s) as a percentage. It is total processor seconds used.'],
    recallPrompt: 'List every running process.',
    accepted: ['gps', 'ps'],
    related: ['ps.get-process-id', 'ps.top-cpu'],
    keywords: ['processes', 'task manager', 'tasklist'],
    source: ps(MGMT, 'Get-Process'),
  },
  {
    id: 'ps.get-process-id',
    command: 'Get-Process -Id 4821 | Select-Object Name, Id, Path, StartTime',
    title: 'Inspect one process',
    category: 'processes',
    subcategory: 'Processes and services',
    difficulty: 'intermediate',
    objective: 'Find where a process was started from and when.',
    summary: 'Shows the name, ID, executable path, and start time of process 4821.',
    whenToUse: 'When an unknown process appears and you need to know what it is.',
    notice: 'An executable running from a user Temp or Downloads folder deserves a closer look.',
    syntax: [
      { token: 'Get-Process -Id 4821', meaning: 'one process by ID' },
      { token: '| Select-Object Name, Id, Path, StartTime', meaning: 'the properties that identify it' },
    ],
    sampleOutput: `Name     Id Path                                         StartTime
----     -- ----                                         ---------
updtsvc 4821 C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe 3/3/2026 2:11:44 AM`,
    mistakes: ['Forgetting that Path is empty for protected processes unless the session is elevated.'],
    recallPrompt: 'Show the name, ID, path, and start time of process 4821.',
    accepted: ['Get-Process -Id 4821 | Select-Object -Property Name, Id, Path, StartTime', 'Get-Process -Id 4821 | Select-Object Name,Id,Path,StartTime'],
    related: ['ps.get-process', 'ps.get-filehash', 'ps.cim-process'],
    keywords: ['process path', 'suspicious process', 'inspect process'],
    source: ps(MGMT, 'Get-Process'),
  },
  {
    id: 'ps.cim-process',
    command: 'Get-CimInstance Win32_Process -Filter "ProcessId = 4821" | Select-Object Name, ParentProcessId, CommandLine',
    title: 'Read a process command line and parent',
    category: 'processes',
    subcategory: 'Processes and services',
    difficulty: 'advanced',
    objective: 'See exactly how a process was launched and which process started it.',
    summary: 'Shows the name, parent process ID, and full command line for process 4821.',
    whenToUse: 'During triage, because the command line and parent often explain what a process is doing.',
    syntax: [
      { token: 'Get-CimInstance Win32_Process', meaning: 'query the WMI process class' },
      { token: '-Filter "ProcessId = 4821"', meaning: 'WQL filter, evaluated by WMI' },
      { token: 'Select-Object Name, ParentProcessId, CommandLine', meaning: 'the triage fields' },
    ],
    sampleOutput: `Name        ParentProcessId CommandLine
----        --------------- -----------
updtsvc.exe            3920 "C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe" --connect 203.0.113.77:4444`,
    mistakes: ['Using == in the WQL filter. WQL uses a single =.'],
    requirements: 'Windows. Seeing other users\' command lines requires an elevated session.',
    recallPrompt: 'Show the parent process ID and full command line of process 4821 using CIM.',
    related: ['ps.get-process-id', 'ps.get-nettcpconnection-established'],
    keywords: ['command line', 'parent process', 'triage'],
    source: ps('CimCmdlets', 'Get-CimInstance'),
  },
  {
    id: 'ps.stop-process-whatif',
    command: 'Stop-Process -Id 4821 -WhatIf',
    title: 'Preview stopping a process',
    category: 'processes',
    subcategory: 'Processes and services',
    difficulty: 'intermediate',
    objective: 'Confirm the target before ending a process.',
    summary: 'Reports which process Stop-Process would end, without ending it.',
    details: 'During an incident, collect evidence such as path, hash, command line, and connections before stopping a suspicious process. Follow your organization\'s response plan.',
    whenToUse: 'Before stopping anything, especially by ID.',
    syntax: [
      { token: 'Stop-Process -Id 4821', meaning: 'end a process by ID' },
      { token: '-WhatIf', meaning: 'simulate only' },
    ],
    sampleOutput: 'What if: Performing the operation "Stop-Process" on target "updtsvc (4821)".',
    mistakes: ['Stopping a process before recording evidence about it.'],
    recallPrompt: 'Preview stopping process 4821 without actually stopping it.',
    related: ['ps.get-process-id'],
    keywords: ['kill process', 'end task'],
    source: ps(MGMT, 'Stop-Process'),
  },
  {
    id: 'ps.get-service',
    command: 'Get-Service',
    title: 'List services',
    category: 'services',
    subcategory: 'Processes and services',
    difficulty: 'beginner',
    objective: 'See every Windows service and whether it is running.',
    summary: 'Lists services with their status, short name, and display name.',
    whenToUse: 'When checking whether a background service is running.',
    syntax: [{ token: 'Get-Service', meaning: 'get services; alias gsv' }],
    sampleOutput: `Status   Name               DisplayName
------   ----               -----------
Running  Dhcp               DHCP Client
Running  Dnscache           DNS Client
Stopped  Fax                Fax
Running  Spooler            Print Spooler
Running  WinRM              Windows Remote Management (WS-Management)`,
    mistakes: ['Searching by display name with -Name. Use -DisplayName for that.'],
    recallPrompt: 'List all services and their status.',
    accepted: ['gsv'],
    related: ['ps.get-service-name', 'ps.where-running'],
    keywords: ['services', 'services.msc'],
    source: ps(MGMT, 'Get-Service'),
  },
  {
    id: 'ps.get-service-name',
    command: 'Get-Service -Name Spooler',
    title: 'Check one service',
    category: 'services',
    subcategory: 'Processes and services',
    difficulty: 'beginner',
    objective: 'Check the status of a specific service by name.',
    summary: 'Shows the status of the Print Spooler service.',
    whenToUse: 'When a user reports that printing does not work.',
    syntax: [
      { token: 'Get-Service', meaning: 'get services' },
      { token: '-Name Spooler', meaning: 'service short name' },
    ],
    sampleOutput: `Status   Name               DisplayName
------   ----               -----------
Stopped  Spooler            Print Spooler`,
    mistakes: ['Using the display name "Print Spooler" with -Name.'],
    recallPrompt: 'Check the status of the Spooler service.',
    accepted: ['Get-Service Spooler'],
    related: ['ps.restart-service', 'ps.get-service'],
    keywords: ['service status', 'spooler'],
    source: ps(MGMT, 'Get-Service'),
  },
  {
    id: 'ps.restart-service',
    command: 'Restart-Service -Name Spooler',
    title: 'Restart a service',
    category: 'services',
    subcategory: 'Processes and services',
    difficulty: 'intermediate',
    objective: 'Stop and start a service on a machine you administer.',
    summary: 'Stops and restarts the Print Spooler service.',
    whenToUse: 'When a service is hung and you are authorized to restart it.',
    syntax: [
      { token: 'Restart-Service', meaning: 'stop then start' },
      { token: '-Name Spooler', meaning: 'service short name' },
    ],
    sampleOutput: '',
    mistakes: ['Running it in a non-elevated session and getting "Cannot open Spooler service".'],
    permissions: 'elevated',
    safety: 'lab-only',
    recallPrompt: 'Restart the Spooler service.',
    accepted: ['Restart-Service Spooler'],
    related: ['ps.get-service-name'],
    keywords: ['restart service'],
    source: ps(MGMT, 'Restart-Service'),
  },
  {
    id: 'ps.cim-autostart-services',
    command: "Get-CimInstance Win32_Service -Filter \"StartMode = 'Auto'\" | Select-Object Name, State, PathName",
    title: 'Audit automatic services and their binaries',
    category: 'services',
    subcategory: 'Configuration inspection',
    difficulty: 'advanced',
    objective: 'List services that start automatically and the executable each one runs.',
    summary: 'Shows name, state, and executable path for every service set to start automatically.',
    whenToUse: 'When reviewing persistence, because a malicious service usually starts automatically.',
    notice: 'Paths outside Windows and Program Files, or unquoted paths containing spaces, deserve review.',
    syntax: [
      { token: 'Get-CimInstance Win32_Service', meaning: 'WMI service class, includes the binary path' },
      { token: "-Filter \"StartMode = 'Auto'\"", meaning: 'only automatic services' },
      { token: 'Select-Object Name, State, PathName', meaning: 'fields to review' },
    ],
    sampleOutput: `Name            State   PathName
----            -----   --------
Dhcp            Running C:\\Windows\\system32\\svchost.exe -k LocalServiceNetworkRestricted -p
EventLog        Running C:\\Windows\\System32\\svchost.exe -k LocalServiceNetworkRestricted -p
UpdaterSvc      Running C:\\ProgramData\\upd\\svc host.exe
WinDefend       Running "C:\\ProgramData\\Microsoft\\Windows Defender\\platform\\4.18.24090.11-0\\MsMpEng.exe"`,
    mistakes: ['Relying on Get-Service, which does not show the executable path in Windows PowerShell 5.1.'],
    requirements: 'Windows.',
    recallPrompt: 'List automatic-start services with their state and executable path using CIM.',
    related: ['ps.get-service', 'ps.run-keys'],
    keywords: ['services audit', 'persistence', 'service path'],
    source: ps('CimCmdlets', 'Get-CimInstance'),
  },

  // ---------------- System information ----------------
  {
    id: 'ps.get-computerinfo',
    command: 'Get-ComputerInfo',
    title: 'Get a full system profile',
    category: 'system',
    subcategory: 'System information',
    difficulty: 'beginner',
    objective: 'Collect OS, hardware, BIOS, and domain information in one command.',
    summary: 'Returns a large object describing Windows edition, version, hardware, memory, time zone, and more.',
    whenToUse: 'When documenting a machine or answering "what is this computer?"',
    notice: 'Pipe to Select-Object with wildcards, for example Select-Object Os*, to focus on part of it.',
    syntax: [{ token: 'Get-ComputerInfo', meaning: 'gather system and OS properties' }],
    sampleOutput: `WindowsProductName             : Windows 11 Pro
WindowsVersion                 : 2009
OsBuildNumber                  : 22631
OsArchitecture                 : 64-bit
CsName                         : WS-LAB-07
CsDomain                       : lab.example
CsTotalPhysicalMemory          : 17045651456
TimeZone                       : (UTC-05:00) Eastern Time (US & Canada)`,
    mistakes: ['Expecting it to be fast. It queries many sources and can take several seconds.'],
    requirements: 'Windows PowerShell 5.1 and PowerShell 7 on Windows.',
    recallPrompt: 'Collect a complete profile of the operating system and hardware.',
    related: ['ps.cim-os', 'ps.get-hotfix'],
    keywords: ['system info', 'systeminfo', 'computer info'],
    source: ps(MGMT, 'Get-ComputerInfo'),
  },
  {
    id: 'ps.cim-os',
    command: 'Get-CimInstance Win32_OperatingSystem',
    title: 'Query the operating system through CIM',
    category: 'system',
    subcategory: 'System information',
    difficulty: 'intermediate',
    objective: 'Read OS version and boot time from WMI quickly.',
    summary: 'Returns the Win32_OperatingSystem instance: version, build, last boot time, and memory figures.',
    whenToUse: 'When you need a fast, scriptable OS query, locally or remotely.',
    syntax: [
      { token: 'Get-CimInstance', meaning: 'query CIM/WMI classes' },
      { token: 'Win32_OperatingSystem', meaning: 'the OS class' },
    ],
    sampleOutput: `SystemDirectory     Organization BuildNumber RegisteredUser SerialNumber            Version
---------------     ------------ ----------- -------------- ------------            -------
C:\\Windows\\system32              22631       labuser        00330-80000-00000-AA111 10.0.22631`,
    mistakes: ['Using Get-WmiObject in PowerShell 7, where it no longer exists.'],
    requirements: 'Windows.',
    recallPrompt: 'Query the Win32_OperatingSystem class.',
    accepted: ['Get-CimInstance -ClassName Win32_OperatingSystem'],
    related: ['ps.get-computerinfo', 'ps.function-basic'],
    keywords: ['wmi', 'cim', 'os version', 'last boot'],
    source: ps('CimCmdlets', 'Get-CimInstance'),
  },
  {
    id: 'ps.cim-disk',
    command: 'Get-CimInstance Win32_LogicalDisk -Filter "DriveType = 3" | Select-Object DeviceID, Size, FreeSpace',
    title: 'Check free disk space',
    category: 'system',
    subcategory: 'System information',
    difficulty: 'intermediate',
    objective: 'See size and free space for each local disk.',
    summary: 'Lists local fixed disks with total size and free space in bytes.',
    whenToUse: 'When an application fails to write or Windows reports low disk space.',
    syntax: [
      { token: 'Win32_LogicalDisk', meaning: 'drive letters' },
      { token: '-Filter "DriveType = 3"', meaning: 'local fixed disks only' },
      { token: 'Select-Object DeviceID, Size, FreeSpace', meaning: 'fields to show' },
    ],
    sampleOutput: `DeviceID         Size   FreeSpace
--------         ----   ---------
C:       254721126400  9122611200
D:      1000186310656 612004151296`,
    mistakes: ['Reading bytes as gigabytes. Divide by 1GB, for example $_.FreeSpace / 1GB.'],
    requirements: 'Windows.',
    recallPrompt: 'Show size and free space of each local fixed disk using CIM.',
    accepted: ["Get-CimInstance Win32_LogicalDisk -Filter 'DriveType = 3' | Select-Object DeviceID, Size, FreeSpace", 'Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" | Select-Object DeviceID, Size, FreeSpace'],
    related: ['ps.get-computerinfo'],
    keywords: ['disk space', 'free space', 'drive'],
    source: ps('CimCmdlets', 'Get-CimInstance'),
  },
  {
    id: 'ps.get-hotfix',
    command: 'Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5',
    title: 'List recent updates',
    category: 'system',
    subcategory: 'System information',
    difficulty: 'intermediate',
    objective: 'See which Windows updates were installed most recently.',
    summary: 'Lists the five most recently installed hotfixes with their KB numbers and dates.',
    whenToUse: 'When checking patch level or whether a specific update is present.',
    syntax: [
      { token: 'Get-HotFix', meaning: 'installed updates from Win32_QuickFixEngineering' },
      { token: '| Sort-Object InstalledOn -Descending', meaning: 'newest first' },
      { token: '| Select-Object -First 5', meaning: 'top five' },
    ],
    sampleOutput: `Source        Description      HotFixID      InstalledBy          InstalledOn
------        -----------      --------      -----------          -----------
WS-LAB-07     Security Update  KB5041585     NT AUTHORITY\\SYSTEM  2/11/2026 12:00:00 AM
WS-LAB-07     Update           KB5040442     NT AUTHORITY\\SYSTEM  1/14/2026 12:00:00 AM
WS-LAB-07     Security Update  KB5039212     NT AUTHORITY\\SYSTEM  12/10/2025 12:00:00 AM`,
    mistakes: ['Assuming the list is complete. Some update types do not appear in this class.'],
    requirements: 'Windows.',
    recallPrompt: 'Show the five most recently installed Windows updates.',
    related: ['ps.get-computerinfo'],
    keywords: ['patches', 'windows updates', 'kb'],
    source: ps(MGMT, 'Get-HotFix'),
  },

  // ---------------- Event logs ----------------
  {
    id: 'ps.get-winevent-system',
    command: 'Get-WinEvent -LogName System -MaxEvents 20',
    title: 'Read recent system events',
    category: 'logs',
    subcategory: 'Event logs',
    difficulty: 'intermediate',
    objective: 'Read the newest entries in the Windows System log.',
    summary: 'Returns the 20 most recent events from the System log, newest first.',
    whenToUse: 'When a service failed, a driver misbehaved, or the machine restarted unexpectedly.',
    notice: 'Check LevelDisplayName for Error and Warning, and note the ProviderName and Id.',
    syntax: [
      { token: 'Get-WinEvent', meaning: 'read event logs' },
      { token: '-LogName System', meaning: 'which log' },
      { token: '-MaxEvents 20', meaning: 'newest 20' },
    ],
    sampleOutput: `   ProviderName: Service Control Manager

TimeCreated                      Id LevelDisplayName Message
-----------                      -- ---------------- -------
3/3/2026 9:15:12 AM            7031 Error            The Print Spooler service terminated unexpectedly. It has done this 1 time(s).
3/3/2026 8:02:40 AM            7036 Information      The Windows Update service entered the running state.

   ProviderName: Microsoft-Windows-Kernel-General

TimeCreated                      Id LevelDisplayName Message
-----------                      -- ---------------- -------
3/2/2026 7:15:20 AM              12 Information      The operating system started at system time 2026-03-02T12:15:20.500000000Z.`,
    mistakes: ['Using Get-EventLog in PowerShell 7, where it was removed.'],
    requirements: 'Windows.',
    recallPrompt: 'Get the 20 newest events from the System log.',
    accepted: ['Get-WinEvent -MaxEvents 20 -LogName System', 'Get-WinEvent System -MaxEvents 20'],
    related: ['ps.get-winevent-4625', 'ps.get-winevent-level'],
    keywords: ['event viewer', 'system log', 'windows events'],
    source: ps('Microsoft.PowerShell.Diagnostics', 'Get-WinEvent'),
  },
  {
    id: 'ps.get-winevent-level',
    command: "Get-WinEvent -FilterHashtable @{LogName='System'; Level=2} -MaxEvents 10",
    title: 'Filter events by level',
    category: 'logs',
    subcategory: 'Event logs',
    difficulty: 'advanced',
    objective: 'Retrieve only error events efficiently.',
    summary: 'Returns the 10 newest Error-level events from the System log.',
    details: 'Levels: 1 Critical, 2 Error, 3 Warning, 4 Information. A filter hashtable is evaluated by the event log service, which is much faster than piping everything to Where-Object.',
    whenToUse: 'When the log is large and you only want errors.',
    syntax: [
      { token: '-FilterHashtable', meaning: 'server-side filter' },
      { token: "@{LogName='System'; Level=2}", meaning: 'hashtable: System log, Error level' },
      { token: '-MaxEvents 10', meaning: 'newest 10 matches' },
    ],
    sampleOutput: `   ProviderName: Service Control Manager

TimeCreated                      Id LevelDisplayName Message
-----------                      -- ---------------- -------
3/3/2026 9:15:12 AM            7031 Error            The Print Spooler service terminated unexpectedly.
3/1/2026 4:40:02 PM            7000 Error            The UpdaterSvc service failed to start due to the following error…`,
    mistakes: ['Writing Level="Error". The hashtable needs the number.'],
    requirements: 'Windows.',
    recallPrompt: 'Get the 10 newest Error-level System events with a filter hashtable.',
    accepted: ['Get-WinEvent -FilterHashtable @{ LogName = \'System\'; Level = 2 } -MaxEvents 10', 'Get-WinEvent -FilterHashtable @{LogName="System"; Level=2} -MaxEvents 10'],
    related: ['ps.get-winevent-system', 'ps.get-winevent-4625'],
    keywords: ['error events', 'filterhashtable'],
    source: { label: 'Creating Get-WinEvent queries with FilterHashtable', url: 'https://learn.microsoft.com/powershell/scripting/samples/creating-get-winevent-queries-with-filterhashtable' },
  },
  {
    id: 'ps.get-winevent-4625',
    command: "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 10",
    title: 'Find failed sign-ins',
    category: 'security',
    subcategory: 'Event logs',
    difficulty: 'advanced',
    objective: 'Retrieve failed logon events from the Security log.',
    summary: 'Returns the 10 newest events with ID 4625, "An account failed to log on".',
    details: 'Related IDs: 4624 successful logon, 4625 failed logon, 4740 account locked out, 4672 special privileges assigned. Each 4625 includes the account name, logon type, and source address in its message.',
    whenToUse: 'When investigating lockouts or possible password guessing.',
    notice: 'Many failures for many accounts from one source is a stronger signal than a few failures for one account.',
    syntax: [
      { token: "LogName='Security'", meaning: 'the Security log; reading it requires elevation' },
      { token: 'Id=4625', meaning: 'failed logon event ID' },
      { token: '-MaxEvents 10', meaning: 'newest 10' },
    ],
    sampleOutput: `   ProviderName: Microsoft-Windows-Security-Auditing

TimeCreated                      Id LevelDisplayName Message
-----------                      -- ---------------- -------
3/3/2026 2:11:19 AM            4625 Information      An account failed to log on.…
3/3/2026 2:11:14 AM            4625 Information      An account failed to log on.…
3/3/2026 2:11:10 AM            4625 Information      An account failed to log on.…`,
    mistakes: ['Running without elevation and getting "Attempted to perform an unauthorized operation".', 'Expecting Level to be Error. Audit failures are logged at Information level.'],
    permissions: 'elevated',
    requirements: 'Windows, elevated session. Logon failure auditing must be enabled, which it is by default on most editions.',
    recallPrompt: 'Get the 10 newest failed logon events from the Security log.',
    accepted: ['Get-WinEvent -FilterHashtable @{ LogName = \'Security\'; Id = 4625 } -MaxEvents 10', 'Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4625} -MaxEvents 10'],
    related: ['ps.get-winevent-level', 'ps.get-localuser'],
    keywords: ['failed logon', '4625', 'brute force', 'security log'],
    source: { label: 'Event 4625 on Microsoft Learn', url: 'https://learn.microsoft.com/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4625' },
  },

  // ---------------- Windows networking ----------------
  {
    id: 'ps.get-netipconfiguration',
    command: 'Get-NetIPConfiguration',
    title: 'Show IP configuration',
    category: 'networking',
    subcategory: 'Windows networking',
    difficulty: 'beginner',
    objective: 'See each adapter address, gateway, and DNS servers in one view.',
    summary: 'Shows each connected adapter with its IPv4 and IPv6 addresses, default gateway, and DNS servers.',
    whenToUse: 'As the first PowerShell step when a workstation has network trouble.',
    notice: 'Check that IPv4Address is not 169.254.x.x, which means DHCP failed, and that a gateway is present.',
    syntax: [{ token: 'Get-NetIPConfiguration', meaning: 'summary of IP settings; alias gip' }],
    sampleOutput: `InterfaceAlias       : Ethernet
InterfaceIndex       : 12
InterfaceDescription : Intel(R) Ethernet Connection I219-LM
NetProfile.Name      : lab.example
IPv4Address          : 192.0.2.57
IPv6DefaultGateway   :
IPv4DefaultGateway   : 192.0.2.1
DNSServer            : 192.0.2.53
                       198.51.100.53`,
    mistakes: ['Confusing it with ipconfig /all, which shows more adapter detail but returns text.'],
    requirements: WIN,
    recallPrompt: 'Show each adapter IP address, default gateway, and DNS servers with a PowerShell cmdlet.',
    accepted: ['gip'],
    related: ['ps.get-netipaddress', 'win.ipconfig-all', 'ps.get-dnsclientserveraddress'],
    keywords: ['ip configuration', 'ipconfig powershell', 'find ip address', 'gateway'],
    source: ps(NET, 'Get-NetIPConfiguration'),
  },
  {
    id: 'ps.get-netipaddress',
    command: 'Get-NetIPAddress -AddressFamily IPv4',
    title: 'List IPv4 addresses',
    category: 'networking',
    subcategory: 'Windows networking',
    difficulty: 'beginner',
    objective: 'List every IPv4 address with its prefix length and origin.',
    summary: 'Lists IPv4 addresses on all interfaces, including how each was assigned.',
    whenToUse: 'When you need exact prefix lengths or to see whether an address came from DHCP.',
    notice: 'PrefixOrigin Dhcp means the address was leased. WellKnown is loopback. Manual is static.',
    syntax: [
      { token: 'Get-NetIPAddress', meaning: 'IP address objects' },
      { token: '-AddressFamily IPv4', meaning: 'IPv4 only' },
    ],
    sampleOutput: `IPAddress         : 192.0.2.57
InterfaceIndex    : 12
InterfaceAlias    : Ethernet
AddressFamily     : IPv4
Type              : Unicast
PrefixLength      : 24
PrefixOrigin      : Dhcp
SuffixOrigin      : Dhcp
AddressState      : Preferred

IPAddress         : 127.0.0.1
InterfaceAlias    : Loopback Pseudo-Interface 1
PrefixLength      : 8
PrefixOrigin      : WellKnown`,
    mistakes: ['Forgetting -AddressFamily and wading through IPv6 link-local addresses.'],
    requirements: WIN,
    recallPrompt: 'List every IPv4 address on this computer with its prefix length.',
    related: ['ps.get-netipconfiguration'],
    keywords: ['ip address', 'ipv4', 'prefix'],
    source: ps(NET, 'Get-NetIPAddress'),
  },
  {
    id: 'ps.get-netroute-default',
    command: 'Get-NetRoute -DestinationPrefix 0.0.0.0/0',
    title: 'Show the default route',
    category: 'networking',
    subcategory: 'Windows networking',
    difficulty: 'intermediate',
    objective: 'Confirm the default gateway and its metric.',
    summary: 'Shows the IPv4 default route, its next hop, interface, and metric.',
    whenToUse: 'When traffic leaves through the wrong interface, such as with a VPN connected.',
    notice: 'With several default routes, the lowest combined RouteMetric plus InterfaceMetric wins.',
    syntax: [
      { token: 'Get-NetRoute', meaning: 'routing table entries' },
      { token: '-DestinationPrefix 0.0.0.0/0', meaning: 'the default route' },
    ],
    sampleOutput: `ifIndex DestinationPrefix NextHop      RouteMetric ifMetric PolicyStore
------- ----------------- -------      ----------- -------- -----------
12      0.0.0.0/0         192.0.2.1              0       25 ActiveStore`,
    mistakes: ['Expecting a value in NextHop for on-link routes. 0.0.0.0 there means directly connected.'],
    requirements: WIN,
    recallPrompt: 'Show the IPv4 default route with PowerShell.',
    related: ['ps.get-netroute', 'win.route-print'],
    keywords: ['default gateway', 'default route'],
    source: ps(NET, 'Get-NetRoute'),
  },
  {
    id: 'ps.get-netroute',
    command: 'Get-NetRoute -AddressFamily IPv4',
    title: 'Show the IPv4 routing table',
    category: 'networking',
    subcategory: 'Windows networking',
    difficulty: 'intermediate',
    objective: 'Read all IPv4 routes on a Windows host.',
    summary: 'Lists every IPv4 route with its destination prefix, next hop, and metrics.',
    whenToUse: 'When a specific network is unreachable while others work.',
    syntax: [
      { token: 'Get-NetRoute', meaning: 'routing table' },
      { token: '-AddressFamily IPv4', meaning: 'IPv4 routes only' },
    ],
    sampleOutput: `ifIndex DestinationPrefix  NextHop      RouteMetric ifMetric PolicyStore
------- -----------------  -------      ----------- -------- -----------
12      255.255.255.255/32 0.0.0.0              256       25 ActiveStore
12      192.0.2.255/32     0.0.0.0              256       25 ActiveStore
12      192.0.2.0/24       0.0.0.0              256       25 ActiveStore
21      10.8.0.0/16        10.8.0.1               1        5 ActiveStore
12      0.0.0.0/0          192.0.2.1              0       25 ActiveStore`,
    mistakes: ['Ignoring persistent routes added long ago that override newer settings.'],
    requirements: WIN,
    recallPrompt: 'List all IPv4 routes on this Windows host.',
    related: ['ps.get-netroute-default'],
    keywords: ['routing table', 'routes'],
    source: ps(NET, 'Get-NetRoute'),
  },
  {
    id: 'ps.get-netneighbor',
    command: 'Get-NetNeighbor -AddressFamily IPv4',
    title: 'Show the ARP cache',
    category: 'networking',
    subcategory: 'Windows networking',
    difficulty: 'intermediate',
    objective: 'See which local IPv4 addresses map to which MAC addresses.',
    summary: 'Lists the IPv4 neighbor cache, the PowerShell view of the ARP table.',
    whenToUse: 'When a local host cannot be reached or two devices might share an IP address.',
    notice: 'Unreachable entries mean ARP requests went unanswered.',
    syntax: [
      { token: 'Get-NetNeighbor', meaning: 'neighbor cache' },
      { token: '-AddressFamily IPv4', meaning: 'ARP entries only' },
    ],
    sampleOutput: `ifIndex IPAddress      LinkLayerAddress   State       PolicyStore
------- ---------      ----------------   -----       -----------
12      192.0.2.255    FF-FF-FF-FF-FF-FF  Permanent   ActiveStore
12      192.0.2.53     52-54-00-1A-2B-53  Reachable   ActiveStore
12      192.0.2.44     00-00-00-00-00-00  Unreachable ActiveStore
12      192.0.2.1      52-54-00-12-35-02  Reachable   ActiveStore`,
    mistakes: ['Treating Stale entries as errors. They only need revalidation.'],
    requirements: WIN,
    recallPrompt: 'Show the IPv4 ARP cache with PowerShell.',
    related: ['win.arp-a', 'linux.ip-neigh-show'],
    keywords: ['arp', 'mac address', 'neighbor'],
    source: ps(NET, 'Get-NetNeighbor'),
  },

  // ---------------- DNS troubleshooting ----------------
  {
    id: 'ps.get-dnsclientserveraddress',
    command: 'Get-DnsClientServerAddress -AddressFamily IPv4',
    title: 'Show configured DNS servers',
    category: 'dns',
    subcategory: 'DNS troubleshooting',
    difficulty: 'beginner',
    objective: 'See which DNS servers each interface uses.',
    summary: 'Lists the IPv4 DNS server addresses configured on each interface.',
    whenToUse: 'When names fail to resolve. A wrong or unreachable DNS server is a common cause.',
    syntax: [
      { token: 'Get-DnsClientServerAddress', meaning: 'DNS servers per interface' },
      { token: '-AddressFamily IPv4', meaning: 'IPv4 servers only' },
    ],
    sampleOutput: `InterfaceAlias               Interface Address ServerAddresses
                             Index     Family
--------------               --------- ------- ---------------
Ethernet                            12 IPv4    {192.0.2.53, 198.51.100.53}
Wi-Fi                               18 IPv4    {}
Loopback Pseudo-Interface 1          1 IPv4    {}`,
    mistakes: ['Checking the wrong interface when Wi-Fi and Ethernet are both present.'],
    requirements: WIN,
    recallPrompt: 'List the IPv4 DNS servers configured on each interface.',
    accepted: ['Get-DnsClientServerAddress'],
    related: ['ps.resolve-dnsname', 'ps.get-dnsclientcache'],
    keywords: ['dns servers', 'dns settings', 'nameserver windows'],
    source: ps('DnsClient', 'Get-DnsClientServerAddress'),
  },
  {
    id: 'ps.resolve-dnsname',
    command: 'Resolve-DnsName example.com',
    title: 'Resolve a name with PowerShell',
    category: 'dns',
    subcategory: 'DNS troubleshooting',
    difficulty: 'beginner',
    objective: 'Look up DNS records and get structured results.',
    summary: 'Queries DNS for example.com and returns its A and AAAA records as objects.',
    whenToUse: 'When a website or server name does not resolve, or resolves to the wrong address.',
    syntax: [
      { token: 'Resolve-DnsName', meaning: 'DNS query cmdlet' },
      { token: 'example.com', meaning: 'name to resolve' },
    ],
    sampleOutput: `Name                                           Type   TTL   Section    IPAddress
----                                           ----   ---   -------    ---------
example.com                                    AAAA   3600  Answer     2606:2800:21f:cb07:6820:80da:af6b:8b2c
example.com                                    A      3600  Answer     93.184.215.14`,
    mistakes: ['Assuming Resolve-DnsName ignores the hosts file. It checks it unless you add -DnsOnly.'],
    requirements: WIN + ' Sends a DNS query.',
    recallPrompt: 'Resolve example.com using a PowerShell cmdlet.',
    accepted: ['Resolve-DnsName -Name example.com'],
    related: ['ps.resolve-dnsname-type', 'ps.get-dnsclientserveraddress', 'win.nslookup'],
    keywords: ['dns lookup', 'nslookup powershell', 'resolve name'],
    source: ps('DnsClient', 'Resolve-DnsName'),
  },
  {
    id: 'ps.resolve-dnsname-type',
    command: 'Resolve-DnsName example.com -Type MX -Server 192.0.2.53',
    title: 'Query a record type on a specific server',
    category: 'dns',
    subcategory: 'DNS troubleshooting',
    difficulty: 'intermediate',
    objective: 'Ask a particular DNS server for a particular record type.',
    summary: 'Asks the server at 192.0.2.53 for the MX records of example.com.',
    whenToUse: 'When comparing answers from internal and external DNS servers.',
    syntax: [
      { token: '-Type MX', meaning: 'record type' },
      { token: '-Server 192.0.2.53', meaning: 'DNS server to ask' },
    ],
    sampleOutput: `Name                                     Type   TTL   Section    NameExchange                    Preference
----                                     ----   ---   -------    ------------                    ----------
example.com                              MX     86400 Answer     .                               0`,
    mistakes: ['Writing -RecordType. The parameter is -Type.'],
    requirements: WIN + ' Sends a DNS query.',
    recallPrompt: 'Ask the DNS server 192.0.2.53 for the MX records of example.com.',
    accepted: ['Resolve-DnsName -Name example.com -Type MX -Server 192.0.2.53', 'Resolve-DnsName example.com -Server 192.0.2.53 -Type MX'],
    related: ['ps.resolve-dnsname'],
    keywords: ['mx record', 'specific dns server'],
    source: ps('DnsClient', 'Resolve-DnsName'),
  },
  {
    id: 'ps.get-dnsclientcache',
    command: 'Get-DnsClientCache',
    title: 'Read the DNS client cache',
    category: 'dns',
    subcategory: 'DNS troubleshooting',
    difficulty: 'intermediate',
    objective: 'See which names this computer has resolved recently.',
    summary: 'Lists cached DNS answers with their record type, status, TTL, and data.',
    whenToUse: 'When a stale answer might explain why a name points to an old address.',
    syntax: [{ token: 'Get-DnsClientCache', meaning: 'contents of the local DNS cache' }],
    sampleOutput: `Entry                     RecordName                Record Status    Section TimeTo Data   Data
                                                    Type                     Live   Length
-----                     ----------                ------ ------    ------- ------ ------ ----
app.lab.example           app.lab.example           A      Success   Answer     211      4 192.0.2.80
example.com               example.com               A      Success   Answer    3412      4 93.184.215.14`,
    mistakes: ['Assuming an entry is current. Check TimeToLive and compare with a fresh query.'],
    requirements: WIN,
    recallPrompt: 'Show what is in the local DNS cache.',
    related: ['ps.clear-dnsclientcache', 'win.ipconfig-displaydns'],
    keywords: ['dns cache', 'displaydns'],
    source: ps('DnsClient', 'Get-DnsClientCache'),
  },
  {
    id: 'ps.clear-dnsclientcache',
    command: 'Clear-DnsClientCache',
    title: 'Clear the DNS cache',
    category: 'dns',
    subcategory: 'DNS troubleshooting',
    difficulty: 'intermediate',
    objective: 'Remove cached DNS answers so the next lookup asks the server again.',
    summary: 'Empties the DNS client cache. The PowerShell equivalent of ipconfig /flushdns.',
    whenToUse: 'After a DNS record changes and this computer still uses the old address.',
    syntax: [{ token: 'Clear-DnsClientCache', meaning: 'flush the local DNS cache' }],
    sampleOutput: '',
    mistakes: ['Flushing before recording the cached entry, which removes useful evidence.'],
    permissions: 'elevated',
    safety: 'changes-state',
    requirements: WIN,
    recallPrompt: 'Flush the DNS client cache with PowerShell.',
    related: ['ps.get-dnsclientcache', 'win.ipconfig-flushdns'],
    keywords: ['flush dns', 'clear dns'],
    source: ps('DnsClient', 'Clear-DnsClientCache'),
  },

  // ---------------- Network adapters ----------------
  {
    id: 'ps.get-netadapter',
    command: 'Get-NetAdapter',
    title: 'List network adapters',
    category: 'networking',
    subcategory: 'Network adapters',
    difficulty: 'beginner',
    objective: 'See each adapter status, link speed, and MAC address.',
    summary: 'Lists physical and virtual adapters with status, MAC address, and link speed.',
    whenToUse: 'When a connection is down and you need to know whether the adapter has a link.',
    notice: '"Disconnected" means no cable or no Wi-Fi association. "Disabled" means it was turned off.',
    syntax: [{ token: 'Get-NetAdapter', meaning: 'network adapters' }],
    sampleOutput: `Name        InterfaceDescription                    ifIndex Status       MacAddress         LinkSpeed
----        --------------------                    ------- ------       ----------         ---------
Ethernet    Intel(R) Ethernet Connection I219-LM         12 Up           8C-16-45-2A-91-0E    1 Gbps
Wi-Fi       Intel(R) Wi-Fi 6 AX201 160MHz                18 Disconnected 3C-58-C2-7F-11-A0     0 bps
VPN         WireGuard Tunnel                             21 Up                               100 Gbps`,
    mistakes: ['Assuming a virtual adapter speed is meaningful.'],
    requirements: WIN,
    recallPrompt: 'List all network adapters with status and link speed.',
    related: ['ps.get-netadapterstatistics', 'win.getmac'],
    keywords: ['network adapter', 'nic', 'link speed', 'mac address'],
    source: ps('NetAdapter', 'Get-NetAdapter'),
  },
  {
    id: 'ps.get-netadapterstatistics',
    command: 'Get-NetAdapterStatistics -Name Ethernet',
    title: 'Show adapter traffic counters',
    category: 'networking',
    subcategory: 'Network adapters',
    difficulty: 'intermediate',
    objective: 'Read bytes and packets sent and received on an adapter.',
    summary: 'Shows received and sent bytes and unicast packets for the Ethernet adapter.',
    whenToUse: 'When checking whether an adapter passes any traffic at all.',
    syntax: [
      { token: 'Get-NetAdapterStatistics', meaning: 'traffic counters' },
      { token: '-Name Ethernet', meaning: 'adapter name' },
    ],
    sampleOutput: `Name                             ReceivedBytes ReceivedUnicastPackets       SentBytes SentUnicastPackets
----                             ------------- ----------------------       --------- ------------------
Ethernet                            2918402211                2390114       402188330             910233`,
    mistakes: ['Using the interface description instead of the adapter name.'],
    requirements: WIN,
    recallPrompt: 'Show traffic counters for the adapter named Ethernet.',
    accepted: ['Get-NetAdapterStatistics Ethernet'],
    related: ['ps.get-netadapter'],
    keywords: ['adapter statistics', 'traffic'],
    source: ps('NetAdapter', 'Get-NetAdapterStatistics'),
  },

  // ---------------- TCP connections ----------------
  {
    id: 'ps.test-netconnection-port',
    command: 'Test-NetConnection example.com -Port 443',
    title: 'Test a TCP port',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'beginner',
    objective: 'Check whether a host accepts connections on a specific port.',
    summary: 'Resolves example.com, tries a TCP connection to port 443, and reports whether it succeeded.',
    whenToUse: 'When an application cannot connect and you need to separate network problems from application problems.',
    notice: 'TcpTestSucceeded True means the port is reachable. False with a successful ping usually means a firewall or a stopped service.',
    syntax: [
      { token: 'Test-NetConnection', meaning: 'connectivity diagnostics; alias tnc' },
      { token: 'example.com', meaning: 'target host, positional ComputerName' },
      { token: '-Port 443', meaning: 'TCP port to test' },
    ],
    sampleOutput: `ComputerName     : example.com
RemoteAddress    : 93.184.215.14
RemotePort       : 443
InterfaceAlias   : Ethernet
SourceAddress    : 192.0.2.57
TcpTestSucceeded : True`,
    mistakes: ['Testing UDP services. Test-NetConnection checks TCP only.'],
    requirements: WIN + ' Sends network traffic. Test only systems you are authorized to test.',
    recallPrompt: 'Check whether example.com accepts TCP connections on port 443.',
    accepted: ['Test-NetConnection -ComputerName example.com -Port 443', 'tnc example.com -Port 443', 'Test-NetConnection example.com -Port 443 -InformationLevel Detailed'],
    related: ['ps.test-connection', 'ps.get-nettcpconnection-listen', 'linux.nc-z'],
    keywords: ['test port', 'port check', 'telnet', 'can i reach'],
    source: ps(NET, 'Test-NetConnection'),
  },
  {
    id: 'ps.test-netconnection-trace',
    command: 'Test-NetConnection example.com -TraceRoute',
    title: 'Trace the route with PowerShell',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'intermediate',
    objective: 'List the router hops to a destination from PowerShell.',
    summary: 'Pings example.com and lists each router hop on the way.',
    whenToUse: 'When a remote network is unreachable and you want to see where traffic stops.',
    syntax: [
      { token: 'Test-NetConnection example.com', meaning: 'target' },
      { token: '-TraceRoute', meaning: 'include a route trace' },
    ],
    sampleOutput: `ComputerName           : example.com
RemoteAddress          : 93.184.215.14
InterfaceAlias         : Ethernet
SourceAddress          : 192.0.2.57
PingSucceeded          : True
PingReplyDetails (RTT) : 15 ms
TraceRoute             : 192.0.2.1
                         198.51.100.1
                         0.0.0.0
                         203.0.113.65
                         93.184.215.14`,
    mistakes: ['Reading 0.0.0.0 as a real hop. It marks a hop that did not answer.'],
    requirements: WIN + ' Sends network traffic.',
    recallPrompt: 'Trace the route to example.com with Test-NetConnection.',
    accepted: ['Test-NetConnection -ComputerName example.com -TraceRoute', 'tnc example.com -TraceRoute'],
    related: ['win.tracert'],
    keywords: ['traceroute', 'tracert powershell', 'hops'],
    source: ps(NET, 'Test-NetConnection'),
  },
  {
    id: 'ps.test-connection',
    command: 'Test-Connection 192.0.2.1 -Count 4',
    title: 'Ping with PowerShell',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'beginner',
    objective: 'Send ICMP echo requests and get objects back.',
    summary: 'Sends four echo requests to 192.0.2.1 and reports each reply.',
    details: 'Output columns differ between Windows PowerShell 5.1 and PowerShell 7. Add -Quiet to get a single True or False.',
    whenToUse: 'When scripting reachability checks across many hosts.',
    syntax: [
      { token: 'Test-Connection', meaning: 'ICMP echo' },
      { token: '192.0.2.1', meaning: 'target' },
      { token: '-Count 4', meaning: 'number of requests' },
    ],
    sampleOutput: `   Destination: 192.0.2.1

Ping Source           Address                   Latency BufferSize Status
                                                   (ms)        (B)
---- ------           -------                   ------- ---------- ------
   1 WS-LAB-07        192.0.2.1                       1         32 Success
   2 WS-LAB-07        192.0.2.1                       1         32 Success
   3 WS-LAB-07        192.0.2.1                       1         32 Success
   4 WS-LAB-07        192.0.2.1                       1         32 Success`,
    mistakes: ['Treating ICMP failure as proof a host is down. Firewalls often block it.'],
    requirements: 'PowerShell 5.1 or 7. Sends network traffic.',
    recallPrompt: 'Send four pings to 192.0.2.1 with a PowerShell cmdlet.',
    accepted: ['Test-Connection -TargetName 192.0.2.1 -Count 4', 'Test-Connection -ComputerName 192.0.2.1 -Count 4'],
    related: ['win.ping', 'ps.test-netconnection-port'],
    keywords: ['ping powershell', 'reachability'],
    source: ps(MGMT, 'Test-Connection'),
  },
  {
    id: 'ps.get-nettcpconnection-listen',
    command: 'Get-NetTCPConnection -State Listen',
    title: 'List listening TCP ports',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'intermediate',
    objective: 'See which TCP ports are open for incoming connections.',
    summary: 'Lists TCP sockets in the Listen state with local address, port, and owning process ID.',
    whenToUse: 'When verifying a service is listening, or auditing exposed ports.',
    notice: '0.0.0.0 or :: means all interfaces. 127.0.0.1 means local only. Match OwningProcess with Get-Process -Id.',
    syntax: [
      { token: 'Get-NetTCPConnection', meaning: 'TCP sockets' },
      { token: '-State Listen', meaning: 'listening sockets only' },
    ],
    sampleOutput: `LocalAddress  LocalPort RemoteAddress RemotePort State  AppliedSetting OwningProcess
------------  --------- ------------- ---------- -----  -------------- -------------
0.0.0.0           49664 0.0.0.0                0 Listen                          712
0.0.0.0            5985 0.0.0.0                0 Listen                            4
0.0.0.0             445 0.0.0.0                0 Listen                            4
0.0.0.0             135 0.0.0.0                0 Listen                          980
127.0.0.1          5432 0.0.0.0                0 Listen                         3112`,
    mistakes: ['Forgetting UDP. Use Get-NetUDPEndpoint for UDP listeners.'],
    requirements: WIN,
    recallPrompt: 'List TCP ports in the listening state with PowerShell.',
    related: ['ps.get-nettcpconnection-established', 'ps.get-netudpendpoint', 'win.netstat-ano'],
    keywords: ['open ports', 'listening ports', 'netstat powershell'],
    source: ps(NET, 'Get-NetTCPConnection'),
  },
  {
    id: 'ps.get-nettcpconnection-established',
    command: 'Get-NetTCPConnection -State Established',
    title: 'List active TCP connections',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'intermediate',
    objective: 'See which remote hosts this computer is talking to right now.',
    summary: 'Lists established TCP connections with local and remote endpoints and the owning process ID.',
    whenToUse: 'When investigating unexpected network activity.',
    notice: 'Look for unfamiliar remote addresses, unusual ports, and processes you cannot explain.',
    syntax: [
      { token: 'Get-NetTCPConnection', meaning: 'TCP sockets' },
      { token: '-State Established', meaning: 'active connections only' },
    ],
    sampleOutput: `LocalAddress  LocalPort RemoteAddress  RemotePort State       AppliedSetting OwningProcess
------------  --------- -------------  ---------- -----       -------------- -------------
192.0.2.57        52144 192.0.2.80            443 Established Internet                7720
192.0.2.57        52190 203.0.113.77         4444 Established Internet                4821
192.0.2.57        49702 192.0.2.10            445 Established Datacenter                 4`,
    mistakes: ['Concluding a connection is malicious from the port number alone. Identify the process first.'],
    requirements: WIN,
    recallPrompt: 'List all established TCP connections with PowerShell.',
    related: ['ps.get-process-id', 'ps.get-nettcpconnection-listen'],
    keywords: ['connections', 'established', 'remote address'],
    source: ps(NET, 'Get-NetTCPConnection'),
  },
  {
    id: 'ps.get-netudpendpoint',
    command: 'Get-NetUDPEndpoint',
    title: 'List UDP endpoints',
    category: 'networking',
    subcategory: 'TCP connections',
    difficulty: 'intermediate',
    objective: 'See which UDP ports are bound on this computer.',
    summary: 'Lists bound UDP endpoints with local address, port, and owning process ID.',
    whenToUse: 'When checking DNS, DHCP, or other UDP-based services.',
    syntax: [{ token: 'Get-NetUDPEndpoint', meaning: 'UDP sockets' }],
    sampleOutput: `LocalAddress    LocalPort OwningProcess
------------    --------- -------------
0.0.0.0              5353          2210
0.0.0.0              5355          2210
192.0.2.57            137             4
127.0.0.1           53110          3002`,
    mistakes: ['Looking for a State column. UDP is connectionless, so there is none.'],
    requirements: WIN,
    recallPrompt: 'List bound UDP endpoints with PowerShell.',
    related: ['ps.get-nettcpconnection-listen'],
    keywords: ['udp ports'],
    source: ps(NET, 'Get-NetUDPEndpoint'),
  },

  // ---------------- Remote administration concepts ----------------
  {
    id: 'ps.test-wsman',
    command: 'Test-WSMan SRV-APP01',
    title: 'Check PowerShell remoting readiness',
    category: 'automation',
    subcategory: 'Remote administration concepts',
    difficulty: 'advanced',
    objective: 'Confirm a remote computer accepts WS-Management connections.',
    summary: 'Sends an identification request to the WinRM service on SRV-APP01 and shows its protocol version.',
    whenToUse: 'Before using Invoke-Command or Enter-PSSession against a server.',
    syntax: [
      { token: 'Test-WSMan', meaning: 'test the WinRM service' },
      { token: 'SRV-APP01', meaning: 'remote computer name' },
    ],
    sampleOutput: `wsmid           : http://schemas.dmtf.org/wbem/wsman/identity/1/wsmanidentity.xsd
ProtocolVersion : http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd
ProductVendor   : Microsoft Corporation
ProductVersion  : OS: 0.0.0 SP: 0.0 Stack: 3.0`,
    mistakes: ['Assuming success means you have permission. It only proves WinRM is listening.'],
    requirements: 'Windows with WinRM. The target must have remoting enabled. Use only on systems you administer.',
    recallPrompt: 'Check whether SRV-APP01 is listening for PowerShell remoting.',
    accepted: ['Test-WSMan -ComputerName SRV-APP01'],
    related: ['ps.invoke-command'],
    keywords: ['winrm', 'remoting', 'wsman'],
    source: ps('Microsoft.WSMan.Management', 'Test-WSMan'),
  },
  {
    id: 'ps.invoke-command',
    command: 'Invoke-Command -ComputerName SRV-APP01 -ScriptBlock { Get-Service -Name W3SVC }',
    title: 'Run a command remotely',
    category: 'automation',
    subcategory: 'Remote administration concepts',
    difficulty: 'advanced',
    objective: 'Run a read-only command on a remote server you administer.',
    summary: 'Runs Get-Service -Name W3SVC on SRV-APP01 and returns the result, tagged with PSComputerName.',
    details: 'The script block runs on the remote computer. Results come back as deserialized objects, which keep their properties but not their methods.',
    whenToUse: 'When checking the same thing on one or many servers without signing in to each.',
    syntax: [
      { token: 'Invoke-Command', meaning: 'run commands on remote computers' },
      { token: '-ComputerName SRV-APP01', meaning: 'target, or a comma-separated list' },
      { token: '-ScriptBlock { ... }', meaning: 'code that runs remotely' },
    ],
    sampleOutput: `Status   Name               DisplayName                            PSComputerName
------   ----               -----------                            --------------
Running  W3SVC              World Wide Web Publishing Service      SRV-APP01`,
    mistakes: ['Referencing local variables inside the block without $using:.'],
    safety: 'lab-only',
    requirements: 'Windows PowerShell remoting enabled on the target, and an account with rights there. Authorized systems only.',
    recallPrompt: 'Run Get-Service -Name W3SVC on SRV-APP01 through PowerShell remoting.',
    accepted: ['Invoke-Command -ComputerName SRV-APP01 -ScriptBlock { Get-Service W3SVC }', 'Invoke-Command SRV-APP01 { Get-Service -Name W3SVC }'],
    related: ['ps.test-wsman'],
    keywords: ['remote command', 'invoke-command', 'remoting'],
    source: ps('Microsoft.PowerShell.Core', 'Invoke-Command'),
  },
])
